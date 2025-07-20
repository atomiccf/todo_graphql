import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useGetCurrentUserId } from "./useGetCurrentUserId";
import { jwtDecode } from "jwt-decode";

vi.mock("jwt-decode", () => ({
    jwtDecode: vi.fn(),
}));

describe("useGetCurrentUserId", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it("returns userId when jwt is valid", () => {
        const fakeUserId = "12345";
        const fakeToken = "valid.jwt.token";
        localStorage.setItem("jwt", fakeToken);
        ;(jwtDecode as any).mockReturnValue({ userId: fakeUserId });

        const { result } = renderHook(() => useGetCurrentUserId());

        expect((jwtDecode as any)).toHaveBeenCalledWith(fakeToken);
        expect(result.current).toBe(fakeUserId);
    });

    it("returns null when no jwt in localStorage", () => {
        const { result } = renderHook(() => useGetCurrentUserId());
        expect(result.current).toBeNull();
        expect((jwtDecode as any)).not.toHaveBeenCalled();
    });

    it("returns undefined when decoded object has no userId", () => {
        const fakeToken = "valid.jwt.token";
        localStorage.setItem("jwt", fakeToken);
        ;(jwtDecode as any).mockReturnValue({});

        const { result } = renderHook(() => useGetCurrentUserId());

        expect(result.current).toBeUndefined();
    });
});
