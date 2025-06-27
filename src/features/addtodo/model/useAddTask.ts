import { useMutation } from '@apollo/client';
import { ADD_TASK } from '../api/addTask';

export const useAddTask = () => {
    return useMutation(ADD_TASK);
};
