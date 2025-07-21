import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { BrowserRouter } from "react-router-dom";

vi.mock("features/admin/StatusManagement/ui/TaskStatusList", () => ({
    TaskStatusList: () => <div>TaskStatusList Mock</div>,
}));

vi.mock("features/admin/PriorityManagement/ui/TaskPriorityList", () => ({
    TaskPriorityList: () => <div>TaskPriorityList Mock</div>,
}));

const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe("TaskCategoriesPage", () => {
    beforeEach(() => {
        mockedNavigate.mockClear();
    });

    it("renders heading, status and priority lists", () => {
        render(
            <BrowserRouter>
                <TaskCategoriesPage />
            </BrowserRouter>
        );

        expect(screen.getByText("Task")).toBeDefined();
        expect(screen.getByText("Categories")).toBeDefined();
        expect(screen.getByText("TaskStatusList Mock")).toBeDefined();
        expect(screen.getByText("TaskPriorityList Mock")).toBeDefined();
    });

    it("navigates back when Go Back button is clicked", () => {
        render(
            <BrowserRouter>
                <TaskCategoriesPage />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText(/Go Back/i));
        expect(mockedNavigate).toHaveBeenCalledWith("/app/dashboard");
    });
});
