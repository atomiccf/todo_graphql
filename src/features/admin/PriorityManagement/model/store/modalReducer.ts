export type ModalState = {
    isOpenAdd: boolean;
    isOpenEdit: boolean;
    editingPriorityId: string | null;
    deletingPriorityId: string | null;
};

export type ModalAction =
    | { type: 'OPEN_ADD' }
    | { type: 'OPEN_EDIT'; payload: string }
    | { type: 'OPEN_DELETE'; payload: string }
    | { type: 'CLOSE_ADD' }
    | { type: 'CLOSE_EDIT' }
    | { type: 'CLOSE_DELETE' }
    | { type: 'CLOSE_ALL' };

export const initialState: ModalState = {
    isOpenAdd: false,
    isOpenEdit: false,
    editingPriorityId: null,
    deletingPriorityId: null
};

export const modalReducer = (
    state: ModalState,
    action: ModalAction
): ModalState => {
    switch (action.type) {
        case 'OPEN_ADD':
            return { ...state, isOpenAdd: true };
        case 'OPEN_EDIT':
            return { ...state, isOpenEdit: true, editingPriorityId: action.payload };
        case 'CLOSE_ADD':
            return { ...state, isOpenAdd: false };
        case 'CLOSE_EDIT':
            return { ...state, isOpenEdit: false, editingPriorityId: null };
        case 'OPEN_DELETE':
            return { ...state, deletingPriorityId: action.payload };
        case 'CLOSE_DELETE':
            return { ...state, deletingPriorityId: null };
        case 'CLOSE_ALL':
            return initialState;
        default:
            return state;
    }
};
