import React from "react";
import { render, screen, waitFor,  } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import { GET_STATUS_LIST, StatusResponse } from "./getStatusList";
import { TaskStatusList } from "../ui/TaskStatusList";

const mocks = [
    {
        request: {
            query: GET_STATUS_LIST,
        },
        result: {
            data: {
                getAllStatus: [
                    { name: "Not Started", color: "#FF0000" },
                    { name: "In Progress", color: "#00FF00" },
                ],
            } as StatusResponse,
        },
    },
];

describe("TaskPriorityListUsingTheQuery", () => {
    it("renders priorities fetched from the GraphQL query", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
            <TaskStatusList />
            </MockedProvider>
    );

        await waitFor(() => {
            expect(screen.getByText("Not Started")).toBeInTheDocument();
            expect(screen.getByText("#FF0000")).toBeInTheDocument();
            expect(screen.getByText("In Progress")).toBeInTheDocument();
            expect(screen.getByText("#00FF00")).toBeInTheDocument();
        });
    });
});
