import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TaskPriorityList } from "./TaskPriorityList";


vi.mock("features/admin/PriorityManagement/model/useGetPriority", () => ({
    useGetPriority: () => ({
        data: {
            getAllPriorities: [
                { name: "High", color: "#FF0000" },
                { name: "Medium", color: "#FFFF00" },
                { name: "Low", color: "#00FF00" },
            ],
        },
    }),
}));

describe("TaskPriorityList", () => {
    it("renders the title", () => {
        render(<TaskPriorityList />);
        expect(screen.getByText(/Task/i)).toBeInTheDocument()
        expect(screen.getByText(/Priority/i)).toBeInTheDocument()
    });

    it("renders table headers", () => {
        render(<TaskPriorityList />);
        expect(screen.getByText("SN")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Color")).toBeInTheDocument();
        expect(screen.getByText("Action")).toBeInTheDocument();
    });

    it("renders a list of priorities", () => {
        render(<TaskPriorityList />);
        expect(screen.getByText("High")).toBeInTheDocument();
        expect(screen.getByText("#FF0000")).toBeInTheDocument();

        expect(screen.getByText("Medium")).toBeInTheDocument();
        expect(screen.getByText("#FFFF00")).toBeInTheDocument();

        expect(screen.getByText("Low")).toBeInTheDocument();
        expect(screen.getByText("#00FF00")).toBeInTheDocument();
    });

    it("renders Edit and Delete buttons for each priority", () => {
        render(<TaskPriorityList />);
        const editButtons = screen.getAllByRole("button", { name: /edit/i });
        const deleteButtons = screen.getAllByRole("button", { name: /delete/i });

        expect(editButtons.length).toBe(3);
        expect(deleteButtons.length).toBe(3);
    });
});
