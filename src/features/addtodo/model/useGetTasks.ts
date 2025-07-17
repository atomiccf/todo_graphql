import { useQuery } from '@apollo/client';
import { GET_TASK_LIST, TaskResponse, TaskVariables } from '../api/getTaskList';

export const useGetTasks = (userId: string | null | undefined) => {
    console.log('userId', userId);
    return useQuery<TaskResponse, TaskVariables>(GET_TASK_LIST, {
        variables: {
            userId: userId || undefined || null
        },
        skip: !userId,
        fetchPolicy: 'cache-and-network'
    });
};
