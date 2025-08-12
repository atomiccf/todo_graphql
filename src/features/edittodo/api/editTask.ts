import { gql, TypedDocumentNode } from "@apollo/client";

interface EditTaskInput{
    taskId: string;
    title: string;
    date: string;
    priority: string;
    description: string;
    image: File | null;
    userId: string | null | undefined;
}

interface EditTaskResult{
    updateTask: string;
}

interface EditTaskVariables{
    taskUpdateInput: EditTaskInput;
}

export const EDIT_TASK: TypedDocumentNode<EditTaskResult, EditTaskVariables> = gql`
    mutation updateTask($taskUpdateInput: TaskUpdateInput!) {
        updateTask(taskUpdateInput: $taskUpdateInput) 
    }
`;
