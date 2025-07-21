import { describe, it, expect } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { useQuery } from "@apollo/client";
import React from "react";
import { GET_TASK_LIST } from "./getTaskList";
import { TaskListWithAddModal } from "../ui/TaskListWithAddModal";

const TestComponent = ({ userId }: { userId: string }) => {
    const { data, loading, error } = useQuery(GET_TASK_LIST, {
        variables: { userId },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;

    return <TaskListWithAddModal allTasks={data?.getAllTasks ?? []} />;
};

const today = new Date();
today.setHours(0, 0, 0, 0);
const todayTimestamp = today.getTime().toString();


const mockTasks = [
    {
        title: "Task Today",
        description: "This task is for today",
        is_completed: false,
        _created_at: todayTimestamp,
        publicUrl: "",
        priority: { id: "1", name: "High", color: "red" },
        status: { id: "1", name: "In Progress", color: "blue" },
    },
    {
        title: "Task Older",
        description: "Old task",
        is_completed: true,
        _created_at: new Date("2024-01-01").getTime().toString(),
        publicUrl: "",
        priority: { id: "2", name: "Low", color: "gray" },
        status: { id: "2", name: "Done", color: "green" },
    },
];

const mocks = [
    {
        request: {
            query: GET_TASK_LIST,
            variables: { userId: "123" },
        },
        result: {
            data: {
                getAllTasks: mockTasks,
            },
        },
    },
];

describe("GET_TASK_LIST + TaskListWithAddModal", () => {
    it("renders today's tasks and toggles older tasks", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TestComponent userId="123" />
            </MockedProvider>        );

        await waitFor(() => {
            expect(screen.getByText("Task Today")).toBeInTheDocument();
        });
        expect(screen.queryByText("Task Older")).not.toBeInTheDocument();
        const toggleButton = screen.getByText(/Show earlier tasks/i);
        fireEvent.click(toggleButton);
        expect(screen.getByText("Task Older")).toBeInTheDocument();
    });
});
