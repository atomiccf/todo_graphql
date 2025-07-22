import { gql, TypedDocumentNode } from "@apollo/client";



interface UpdatePriorityVariable {
    priorityInput: {
        _id: string;
        name: string;
        color: string;
    };
}

export interface UpdatePriorityResult {
    updatePriority: string;
}

export const UPDATE_PRIORITY: TypedDocumentNode<UpdatePriorityResult, UpdatePriorityVariable> = gql`
    mutation updatePriority($updateInput: UpdatePriorityInput!) {
        updatePriority(updateInput: $updateInput) 
    }
`;
