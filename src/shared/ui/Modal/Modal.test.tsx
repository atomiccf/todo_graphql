import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Modal } from "./Modal";
import styles from "./Modal.module.css";

describe("Modal", () => {
    beforeEach(() => {
        const modalRoot = document.createElement("div");
        modalRoot.id = "modal";
        document.body.appendChild(modalRoot);
    });

    afterEach(() => {
        const modalRoot = document.getElementById("modal");
        if (modalRoot) document.body.removeChild(modalRoot);
    });

    it("renders children and active classes when isOpen is true", () => {
        render(
            <Modal isOpen={true}>
                <div data-testid="modal-content">Modal Content</div>
            </Modal>
        );

        const modalRoot = document.getElementById("modal")!;

        const content = screen.getByTestId("modal-content");
        expect(content).toBeInTheDocument();


        const overlay = modalRoot.querySelector(`.${styles.overlay}`);
        expect(overlay).toBeInTheDocument();
        expect(overlay).toHaveClass(styles.active);


        const dialog = modalRoot.querySelector(`.${styles.modal}`);
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveClass(styles.active);
    });

    it("renders nothing when isOpen is false", () => {
        render(
            <Modal isOpen={false}>
                <div data-testid="modal-content">Modal Content</div>
            </Modal>
        );

        const modalRoot = document.getElementById("modal")!;

        expect(modalRoot).toBeEmptyDOMElement();
        expect(screen.queryByTestId("modal-content")).toBeNull();
    });
});
