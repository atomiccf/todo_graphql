import React, {ReactPortal, useEffect, useState} from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    isOpen: boolean;
    children: React.ReactNode;
    containerId?: string;
}

export function Portal({ children, containerId, isOpen }: PortalProps):ReactPortal | null {
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (isOpen && containerId) {
            const element = document.getElementById(containerId);
            setContainer(element);
        } else {
            setContainer(null);
        }
    }, [isOpen, containerId]);

    if (!container) return null;

    return createPortal(children, container);
}
