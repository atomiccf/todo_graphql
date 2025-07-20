import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { describe, it, expect } from "vitest";
import { PriorityField } from "./PriorityField";
import { FormInput } from "features/addtodo/ui/AddTaskModal/AddTaskModal";


const Wrapper = ({ defaultValues }: { defaultValues?: Partial<FormInput> }) => {
    const methods = useForm<FormInput>({ defaultValues });
    return (
        <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})}>
        <PriorityField control={methods.control} errors={methods.formState.errors} />
    <button type="submit">Submit</button>
        </form>
        </FormProvider>
);
};

describe("PriorityField", () => {
    it("renders the label and priority options", () => {
        render(<Wrapper />);
        expect(screen.getByText(/priority/i)).toBeInTheDocument();
        expect(screen.getByText(/extreme/i)).toBeInTheDocument();
        expect(screen.getByText(/moderate/i)).toBeInTheDocument();
        expect(screen.getByText(/low/i)).toBeInTheDocument();
    });

    it("shows required validation error when submitted without selection", async () => {
        render(<Wrapper />);
        await act(async () => {
            fireEvent.click(screen.getByText("Submit"));
        });
        expect(await screen.findByText(/priority is required/i)).toBeInTheDocument();
    });

});
