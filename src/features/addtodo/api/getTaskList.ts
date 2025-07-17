import { gql, TypedDocumentNode } from "@apollo/client";

export interface TaskVariables {
    userId: string | null | undefined;
}

export interface Task {
    title: string;
    description: string;
    is_completed: boolean;
    priority: string;
    _created_at: string;
    publicUrl: string ;
}

export interface TaskResponse {
    getAllTasks: Task[];
}

export const GET_TASK_LIST: TypedDocumentNode<TaskResponse, TaskVariables> = gql`
    query getAllTasks($userId: String!) {
        getAllTasks(userId: $userId) {
            title
            description
            is_completed
            priority
            _created_at
            publicUrl
        }
    }
`;
