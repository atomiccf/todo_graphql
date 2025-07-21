import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFormatDate } from "./useFormatDate";

describe("useFormatDate", () => {
    it("formats valid timestamp correctly", () => {
        const timestamp = String(new Date("2023-07-21").getTime());
        const { result } = renderHook(() => useFormatDate(timestamp));
        expect(result.current).toBe("21/07/2023");
    });

    it("returns 'Invalid Date' for invalid timestamp", () => {
        const timestamp = "invalid";
        const { result } = renderHook(() => useFormatDate(timestamp));
        expect(result.current).toBe("Invalid Date");
    });
});
