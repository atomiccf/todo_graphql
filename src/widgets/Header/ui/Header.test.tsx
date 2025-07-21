import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";


vi.mock("widgets/Header/ui/LogoDisplay", () => ({
    LogoDisplay: () => <div data-testid="logo-display" />,
}));

vi.mock("widgets/Header/ui/DateDisplay", () => ({
    DateDisplay: () => <div data-testid="date-display" />,
}));

vi.mock("features/taskSearch/ui/TaskSearchInput", () => ({
    TaskSearchInput: () => <input data-testid="task-search-input" />,
}));

vi.mock("features/notifications/ui/Notifications", () => ({
    Notifications: () => <div data-testid="notifications" />,
}));

vi.mock("features/calendar/ui/Calendar", () => ({
    Calendar: () => <div data-testid="calendar" />,
}));

describe("Header", () => {
    it("renders all main child components", () => {
        render(<Header />);

        expect(screen.getByTestId("logo-display")).toBeInTheDocument();
        expect(screen.getByTestId("task-search-input")).toBeInTheDocument();
        expect(screen.getByTestId("notifications")).toBeInTheDocument();
        expect(screen.getByTestId("calendar")).toBeInTheDocument();
        expect(screen.getByTestId("date-display")).toBeInTheDocument();
    });
});
