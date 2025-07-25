import { gql, TypedDocumentNode } from "@apollo/client";

interface DeleteTaskResult {
    deleteTask: string;
}

interface DeleteTaskVariable {
    taskId: string;
}

export const DELETE_TASK: TypedDocumentNode<DeleteTaskResult, DeleteTaskVariable> = gql`
    mutation deleteTask($taskId: String!) {
        deleteTask(taskId: $taskId) 
    }
`;
