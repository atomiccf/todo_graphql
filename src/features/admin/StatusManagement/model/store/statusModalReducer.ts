export type StatusModalState = {
    isOpenAdd: boolean;
    isOpenEdit: boolean;
    editingStatusId: string | null;
    deletingStatusId: string | null;
};

export type StatusModalAction =
    | { type: 'OPEN_ADD' }
    | { type: 'OPEN_EDIT'; payload: string }
    | { type: 'OPEN_DELETE'; payload: string }
    | { type: 'CLOSE_ADD' }
    | { type: 'CLOSE_EDIT' }
    | { type: 'CLOSE_DELETE' }
    | { type: 'CLOSE_ALL' };

export const initialState: StatusModalState = {
    isOpenAdd: false,
    isOpenEdit: false,
    editingStatusId: null,
    deletingStatusId: null
};

export const statusModalReducer = (
    state: StatusModalState,
    action: StatusModalAction
): {
    isOpenAdd: boolean;
    isOpenEdit: boolean;
    editingStatusId: string | null;
    deletingStatusId: string | null;
} => {
    switch (action.type) {
        case 'OPEN_ADD':
            return { ...state, isOpenAdd: true };
        case 'OPEN_EDIT':
            return { ...state, isOpenEdit: true, editingStatusId: action.payload };
        case 'CLOSE_ADD':
            return { ...state, isOpenAdd: false };
        case 'CLOSE_EDIT':
            return { ...state, isOpenEdit: false, editingStatusId: null };
        case 'OPEN_DELETE':
            return { ...state, deletingStatusId: action.payload };
        case 'CLOSE_DELETE':
            return { ...state, deletingStatusId: null };
        case 'CLOSE_ALL':
            return initialState;
        default:
            return state;
    }
};
