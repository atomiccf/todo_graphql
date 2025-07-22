import { gql, TypedDocumentNode } from "@apollo/client";

interface DeleteStatusVariable {
        _id: string;
}

export interface DeleteStatusResult {
        deleteStatus: string
}

export const DELETE_STATUS: TypedDocumentNode<DeleteStatusResult, DeleteStatusVariable> = gql`
    mutation deleteStatus($_id: String!) {
        deleteStatus(_id: $_id) 
    }
`;
