import React from "react";
import { render, screen, fireEvent,act } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { describe, it, expect } from "vitest";
import { TitleField } from "./TitleField";
import { FormInput } from "features/addtodo/ui/AddTaskModal/AddTaskModal";


const Wrapper = ({ defaultValues }: { defaultValues?: Partial<FormInput> }) => {
    const methods = useForm<FormInput>({ defaultValues });
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(() => {})}>
                <TitleField control={methods.control} errors={methods.formState.errors} />
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    );
};

describe("TitleField", () => {
    it("renders the title label and input", () => {
        render(<Wrapper />);
        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /title/i })).toBeInTheDocument();
    });

    it("shows required validation error when submitted empty", async () => {
        render(<Wrapper />);
        await act(async () => {
            fireEvent.click(screen.getByText("Submit"));
        });
        expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    });

    it("shows minLength validation error when input is too short", async () => {
        render(<Wrapper />);
        const input = screen.getByLabelText(/title/i);
        await act(async () => {
            fireEvent.change(input, { target: { value: "Hi" } });
            fireEvent.click(screen.getByText("Submit"));
        });
        expect(await screen.findByText(/minimum 3 characters/i)).toBeInTheDocument();
    });

    it("accepts valid input without errors", async () => {
        render(<Wrapper />);
        const input = screen.getByLabelText(/title/i);
        await act(async () => {
            fireEvent.change(input, { target: { value: "Valid Title" } });
            fireEvent.click(screen.getByText("Submit"));
        });
        expect(screen.queryByText(/title is required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/minimum 3 characters/i)).not.toBeInTheDocument();
    });
});
