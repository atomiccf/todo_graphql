import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { useMutation } from "@apollo/client";
import React from "react";
import { ADD_TASK } from "./addTask";

// Dummy Component
const TaskAdder = () => {
    const [addTask, { data }] = useMutation(ADD_TASK);

    const handleAdd = async () => {
        await addTask({
            variables: {
                taskInput: {
                    title: "Test Task",
                    date: "2025-07-20",
                    priority: "High",
                    description: "This is a test task",
                    image: null,
                    userId: "12345",
                }
            }
        });
    };

    return (
        <div>
            <button onClick={handleAdd}>Add Task</button>
            {data && <p>Task ID: {data.addTask}</p>}
        </div>
    );
};

const mocks = [
    {
        request: {
            query: ADD_TASK,
            variables: {
                taskInput: {
                    title: "Test Task",
                    date: "2025-07-20",
                    priority: "High",
                    description: "This is a test task",
                    image: null,
                    userId: "12345",
                },
            },
        },
        result: {
            data: {
                addTask: "mock-task-id-001"
            },
        },
    },
];

describe("ADD_TASK mutation", () => {
    it("should call the mutation and render the task ID", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TaskAdder />
            </MockedProvider>
        );

        await userEvent.click(screen.getByText("Add Task"));

        await waitFor(() => {
            expect(screen.getByText("Task ID: mock-task-id-001")).toBeDefined();
        });
    });
});
