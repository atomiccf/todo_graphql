import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useGetCurrentDate } from "./useGetCurrentDate";

describe("useGetCurrentDate", () => {
    it("returns correct day and formatted date", () => {
        const mockDate = new Date("2025-07-21T12:00:00Z");
        vi.useFakeTimers();
        vi.setSystemTime(mockDate);

        const { result } = renderHook(() => useGetCurrentDate());

        expect(result.current.currentDay).toBe("Monday");
        expect(result.current.date).toBe("21/07/2025");

        vi.useRealTimers();
    });
});
