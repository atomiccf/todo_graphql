import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LogoDisplay } from "./LogoDisplay";
import { MemoryRouter } from "react-router-dom";

describe("LogoDisplay", () => {
    it("displays 'Dashboard' when pathname is '/app/dashboard'", () => {
        render(
            <MemoryRouter initialEntries={["/app/dashboard"]}>
                <LogoDisplay />
            </MemoryRouter>
        );

        const title = screen.getByRole("heading", { level: 1 });
        expect(title).toHaveTextContent("Dashboard");
        expect(title).toBeInTheDocument();
    });

    it("displays 'To-Do' when pathname is not '/app/dashboard'", () => {
        render(
            <MemoryRouter initialEntries={["/app/tasks"]}>
                <LogoDisplay />
            </MemoryRouter>
        );

        const title = screen.getByRole("heading", { level: 1 });
        expect(title).toHaveTextContent("To-Do");
        expect(title).toBeInTheDocument();
    });
});
