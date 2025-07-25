import { gql, TypedDocumentNode } from "@apollo/client";

interface InputPriority {
    name: string
    color: string
}

interface AddPriorityResult {
    addPriority: string;
}

interface AddPriorityVariable {
   priorityInput: InputPriority
}

export const ADD_PRIORITY: TypedDocumentNode<AddPriorityResult, AddPriorityVariable> = gql`
    mutation addPriority($priorityInput: PriorityInput!) {
        addPriority(priorityInput: $priorityInput) 
    }
`;
