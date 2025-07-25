import { useMutation } from '@apollo/client';
import { EDIT_TASK } from '../api/editTask';

export const useEditTask = () => {
    return useMutation(EDIT_TASK);
};
