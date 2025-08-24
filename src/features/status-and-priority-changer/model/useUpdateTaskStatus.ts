import { useMutation } from '@apollo/client';
import { UPDATE_TASK_STATUS } from '../api/updateTaskStatus';

export const useUpdateTaskStatus = () => {
    return useMutation(UPDATE_TASK_STATUS);
}
