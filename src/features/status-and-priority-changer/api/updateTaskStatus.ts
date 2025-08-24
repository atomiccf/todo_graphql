import { gql, TypedDocumentNode } from "@apollo/client";

interface StatusUpdateInput {
    taskId: string;
    statusId: string;
}

interface UpdateTaskStatusResult {
    updateTaskStatus: string;
}

interface UpdateTaskStatusVariables {
    taskUpdateStatusInput: StatusUpdateInput;
}

export const UPDATE_TASK_STATUS: TypedDocumentNode<UpdateTaskStatusResult, UpdateTaskStatusVariables> = gql`
    mutation updateTaskStatus($taskUpdateStatusInput: StatusUpdateInput!) {
        updateTaskStatus(taskUpdateStatusInput: $taskUpdateStatusInput)
    }
`;
