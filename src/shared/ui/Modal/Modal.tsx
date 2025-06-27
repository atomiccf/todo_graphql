import React from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
import style from './Modal.module.css'

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
}

export const Modal:React.FC<ModalProps> = ({ isOpen, children }: ModalProps) => {
    return (
        <Portal isOpen={isOpen} containerId="modal">
            <>
                <div className={isOpen ? `${style.overlay} ${style.active}` : `${style.overlay}`}>
                </div>
                <div className={
                    isOpen
                        ? `${style.modal} ${style.active}`
                        : `${style.modal} ${style.disabled}`
                }>
                    {children}
                </div>
            </>
        </Portal>
    )
}
