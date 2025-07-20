import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EditButton } from "./EditButton";

describe("EditButton", () => {
    it("renders the button with text 'Edit'", () => {
        render(<EditButton />);
        const button = screen.getByRole("button", { name: /edit/i });
        expect(button).toBeInTheDocument();
    });

    it("calls onClick handler when clicked", () => {
        const onClick = vi.fn();
        render(<EditButton onClick={onClick} />);
        const button = screen.getByRole("button", { name: /edit/i });
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

});
