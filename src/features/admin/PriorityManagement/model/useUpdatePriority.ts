import { useMutation } from '@apollo/client';
import { UPDATE_PRIORITY, UpdatePriorityResult } from '../api/updatePriority';

export const useUpdatePriority = () => {
    return useMutation<UpdatePriorityResult>(UPDATE_PRIORITY)
}
