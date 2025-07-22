import { gql, TypedDocumentNode } from "@apollo/client";

interface UpdateStatusVariable {
    updateInput: {
        _id: string;
        name: string;
        color: string;
    };
}

export interface UpdateStatusResult {
    updateStatus: string;
}

export const UPDATE_STATUS: TypedDocumentNode<UpdateStatusResult, UpdateStatusVariable> = gql`
    mutation updateStatus($updateInput: UpdateStatusInput!) {
        updateStatus(updateInput: $updateInput) 
    }
`;
