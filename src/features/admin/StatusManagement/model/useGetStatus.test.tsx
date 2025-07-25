import React from "react";
import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { useGetStatus } from "./useGetStatus";
import { GET_STATUS_LIST } from "features/admin/StatusManagement/api/getStatusList";

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
            },
        },
    },
];

describe("useGetStatus hooks", () => {
    it("fetches and returns priority data", async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <MockedProvider mocks={mocks} addTypename={false}>
            {children}
            </MockedProvider>
    );

        const { result } = renderHook(() => useGetStatus(), { wrapper });


        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBeUndefined();


        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.data).toBeDefined();
            expect(result.current.data?.getAllStatus).toHaveLength(2);
            expect(result.current.data?.getAllStatus[0].name).toBe("Not Started");
        });
    });

    it("handles error state", async () => {
        const errorMocks = [
            {
                request: {
                    query: GET_STATUS_LIST,
                },
                error: new Error("Network error"),
            },
        ];

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <MockedProvider mocks={errorMocks} addTypename={false}>
            {children}
            </MockedProvider>
    );

        const { result } = renderHook(() => useGetStatus(), { wrapper });

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeDefined();
            expect(result.current.data).toBeUndefined();
        });
    });
});
