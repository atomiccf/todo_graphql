import { gql, TypedDocumentNode } from "@apollo/client";


interface Priority {
    name: string
    color: string
}

export interface PriorityResponse {
    getAllPriorities: Priority[];
}
export const GET_PRIORITY_LIST: TypedDocumentNode<{ getAllPriorities: Priority[] }> = gql`
    query getAllPriorities {
        getAllPriorities{
            name
            color
        }
    }
`;
