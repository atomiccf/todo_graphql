import { gql, TypedDocumentNode } from "@apollo/client";


interface Priority {
    _id: string
    name: string
    color: string
    is_deleted: boolean
}

export interface PriorityResponse {
    getAllPriorities: Priority[];
}
export const GET_PRIORITY_LIST: TypedDocumentNode<{ getAllPriorities: Priority[] }> = gql`
    query getAllPriorities {
        getAllPriorities{
            _id
            name
            color
            is_deleted
        }
    }
`;
