import React, { useReducer } from 'react';
import { modalReducer, initialState, ModalAction, ModalState } from '../store/modalReducer';

export const useEditTaskModal = (): [ModalState, React.Dispatch<ModalAction>] => {
    const [state, dispatch] = useReducer(modalReducer, initialState);
    return [state, dispatch];
};
