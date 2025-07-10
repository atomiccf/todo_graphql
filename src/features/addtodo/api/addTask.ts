import { gql, TypedDocumentNode } from "@apollo/client";

interface TaskInput {
    title: string;
    date: string;
    priority: string;
    description: string;
    image: File | null;
    userId: string | null | undefined;
}

interface AddTaskResult {
    addTask: string;
}

interface AddTaskVariables {
    taskInput: TaskInput;
}

export const ADD_TASK: TypedDocumentNode<AddTaskResult, AddTaskVariables> = gql`
    mutation addTask($taskInput: TaskInput!) {
        addTask(taskInput: $taskInput) 
    }
`;
