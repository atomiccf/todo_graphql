import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Portal } from "./Portal";

describe("Portal", () => {
    it("renders children into the specified container when isOpen is true", () => {
        const container = document.createElement("div");
        container.id = "test-container";
        document.body.appendChild(container);

        render(
            <Portal containerId="test-container" isOpen={true}>
                <div data-testid="portal-content">Portal Content</div>
            </Portal>
        );

        const portalContent = screen.getByTestId("portal-content");
        expect(container.contains(portalContent)).toBe(true);

        document.body.removeChild(container);
    });

    it("does not render children if isOpen is false", () => {
        const container = document.createElement("div");
        container.id = "test-container";
        document.body.appendChild(container);

        render(
            <Portal containerId="test-container" isOpen={false}>
                <div data-testid="portal-content">Portal Content</div>
            </Portal>
        );

        const portalContent = screen.queryByTestId("portal-content");
        expect(portalContent).toBeNull();

        document.body.removeChild(container);
    });

    it("does not render children if containerId is not provided", () => {
        render(
            <Portal isOpen={true}>
                <div data-testid="portal-content">Portal Content</div>
            </Portal>
        );

        const portalContent = screen.queryByTestId("portal-content");
        expect(portalContent).toBeNull();
    });
});
