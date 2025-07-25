import { gql, TypedDocumentNode } from "@apollo/client";

export interface TaskVariables {
    userId: string | null | undefined;
}

type Priority = {
    id: string;
    name: string;
    color: string;
}

type Status = {
    id: string;
    name: string;
    color: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    is_completed: boolean;
    is_deleted: boolean;
    priority: Priority;
    status: Status;
    _created_at: string;
    publicUrl: string ;
}

export interface TaskResponse {
    getAllTasks: Task[];
}

export const GET_TASK_LIST: TypedDocumentNode<TaskResponse, TaskVariables> = gql`
    query getAllTasks($userId: String!) {
        getAllTasks(userId: $userId) {
            id
            title
            description
            is_completed
            is_deleted
            priority {
                id
                name
                color
            }
            status {
                id
                name
                color
            }
            _created_at
            publicUrl
        }
    }
`;
