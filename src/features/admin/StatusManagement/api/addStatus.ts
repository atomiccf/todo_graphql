import { gql, TypedDocumentNode } from "@apollo/client";

interface InputStatus {
    statusInput: {
        name: string;
        color: string;
    }

}

interface AddStatusResult {
    addStatus: string;
}

export const ADD_STATUS: TypedDocumentNode<AddStatusResult, InputStatus> = gql`
    mutation addStatus($statusInput: StatusInput!) {
        addStatus(statusInput: $statusInput) 
    }
`;
