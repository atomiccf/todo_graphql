import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DeleteButton } from "./DeleteButton";

describe("DeleteButton", () => {
    it("renders the button with text 'Delete'", () => {
        render(<DeleteButton />);
        const button = screen.getByRole("button", { name: /delete/i });
        expect(button).toBeInTheDocument();
    });

    it("calls onClick handler when clicked", () => {
        const onClick = vi.fn();
        render(<DeleteButton onClick={onClick} />);
        const button = screen.getByRole("button", { name: /delete/i });
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

});
