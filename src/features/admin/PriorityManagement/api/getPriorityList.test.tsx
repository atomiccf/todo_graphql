import React from "react";
import { render, screen, waitFor,  } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import { GET_PRIORITY_LIST, PriorityResponse } from "./getPriorityList";
import { TaskPriorityList } from "../ui/TaskPriorityList";

const mocks = [
    {
        request: {
            query: GET_PRIORITY_LIST,
        },
        result: {
            data: {
                getAllPriorities: [
                    { name: "High", color: "#FF0000" },
                    { name: "Low", color: "#00FF00" },
                ],
            } as PriorityResponse,
        },
    },
];

describe("TaskPriorityListUsingTheQuery", () => {
    it("renders priorities fetched from the GraphQL query", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TaskPriorityList />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText("High")).toBeInTheDocument();
            expect(screen.getByText("#FF0000")).toBeInTheDocument();
            expect(screen.getByText("Low")).toBeInTheDocument();
            expect(screen.getByText("#00FF00")).toBeInTheDocument();
        });
    });
});
