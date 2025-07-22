import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DateDisplay } from "./DateDisplay";


vi.mock("widgets/Header/lib/hooks/useGetCurrentDate", () => ({
    useGetCurrentDate: () => ({
        currentDay: "Monday",
        date: "July 21, 2025",
    }),
}));

describe("DateDisplay", () => {
    it("renders current day and date from the hooks", () => {
        render(<DateDisplay />);

        expect(screen.getByText("Monday")).toBeInTheDocument();
        expect(screen.getByText("July 21, 2025")).toBeInTheDocument();
    });
});
