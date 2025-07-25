import React, { useReducer } from 'react';
import {statusModalReducer, initialState, StatusModalAction, StatusModalState} from 'features/admin/StatusManagement/model/store/statusModalReducer';

export const useStatusModal = (): [StatusModalState, React.Dispatch<StatusModalAction>] => {
    const [state, dispatch] = useReducer(statusModalReducer, initialState);
    return [state, dispatch];
};
