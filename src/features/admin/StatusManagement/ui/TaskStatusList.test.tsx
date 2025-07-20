import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TaskStatusList } from "./TaskStatusList";


vi.mock("features/admin/StatusManagement/model/useGetStatus", () => ({
    useGetStatus: () => ({
        data: {
            getAllStatus: [
                { name: "Open", color: "#00FF00" },
                { name: "In Progress", color: "#FFFF00" },
                { name: "Closed", color: "#FF0000" },
            ],
        },
    }),
}));

describe("TaskStatusList", () => {
    it("renders the title", () => {
        render(<TaskStatusList />);
        expect(screen.getByText(/Task/i)).toBeInTheDocument()
        expect(screen.getByText(/Status/i)).toBeInTheDocument()
    });

    it("renders table headers", () => {
        render(<TaskStatusList />);
        expect(screen.getByText("SN")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Color")).toBeInTheDocument();
        expect(screen.getByText("Action")).toBeInTheDocument();
    });

    it("renders a list of statuses with names and colors", () => {
        render(<TaskStatusList />);
        expect(screen.getByText("Open")).toBeInTheDocument();
        expect(screen.getByText("#00FF00")).toBeInTheDocument();

        expect(screen.getByText("In Progress")).toBeInTheDocument();
        expect(screen.getByText("#FFFF00")).toBeInTheDocument();

        expect(screen.getByText("Closed")).toBeInTheDocument();
        expect(screen.getByText("#FF0000")).toBeInTheDocument();
    });

    it("renders Edit and Delete buttons for each status", () => {
        render(<TaskStatusList />);
        const editButtons = screen.getAllByRole("button", { name: /edit/i });
        const deleteButtons = screen.getAllByRole("button", { name: /delete/i });

        expect(editButtons.length).toBe(3);
        expect(deleteButtons.length).toBe(3);
    });
});
