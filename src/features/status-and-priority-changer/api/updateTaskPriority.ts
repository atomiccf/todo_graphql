import { gql, TypedDocumentNode } from "@apollo/client";

interface UpdateTaskPriorityInput {
    taskId: string;
    priorityId: string;
}

interface UpdateTaskPriorityResult {
    updateTaskPriority: string;
}

interface UpdateTaskPriorityVariables {
    taskUpdatePriorityInput: UpdateTaskPriorityInput;
}

export const UPDATE_TASK_PRIORITY: TypedDocumentNode<UpdateTaskPriorityResult, UpdateTaskPriorityVariables> = gql`
    mutation updateTaskPriority($taskUpdatePriorityInput: PriorityUpdateInput!) {
        updateTaskPriority(taskUpdatePriorityInput: $taskUpdatePriorityInput)
    }
`;
