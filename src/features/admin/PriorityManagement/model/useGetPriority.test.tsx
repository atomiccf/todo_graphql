import React from "react";
import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { useGetPriority } from "./useGetPriority";
import { GET_PRIORITY_LIST } from "features/admin/PriorityManagement/api/getPriorityList";

const mocks = [
    {
        request: {
            query: GET_PRIORITY_LIST,
        },
        result: {
            data: {
                getAllPriorities: [
                    { name: "High", color: "#FF0000" },
                    { name: "Medium", color: "#00FF00" },
                ],
            },
        },
    },
];

describe("useGetPriority hooks", () => {
    it("fetches and returns priority data", async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <MockedProvider mocks={mocks} addTypename={false}>
            {children}
            </MockedProvider>
    );

        const { result } = renderHook(() => useGetPriority(), { wrapper });


        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBeUndefined();


        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.data).toBeDefined();
            expect(result.current.data?.getAllPriorities).toHaveLength(2);
            expect(result.current.data?.getAllPriorities[0].name).toBe("High");
        });
    });

    it("handles error state", async () => {
        const errorMocks = [
            {
                request: {
                    query: GET_PRIORITY_LIST,
                },
                error: new Error("Network error"),
            },
        ];

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <MockedProvider mocks={errorMocks} addTypename={false}>
            {children}
            </MockedProvider>
    );

        const { result } = renderHook(() => useGetPriority(), { wrapper });

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeDefined();
            expect(result.current.data).toBeUndefined();
        });
    });
});
