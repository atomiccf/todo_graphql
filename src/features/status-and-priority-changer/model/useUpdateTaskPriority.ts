import { useMutation } from '@apollo/client';
import { UPDATE_TASK_PRIORITY } from '../api/updateTaskPriority';

export const useUpdateTaskPriority = () => {
    return useMutation(UPDATE_TASK_PRIORITY);
}
