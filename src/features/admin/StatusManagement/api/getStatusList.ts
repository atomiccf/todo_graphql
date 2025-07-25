import { gql, TypedDocumentNode } from "@apollo/client";


interface Status {
    _id: string
    name: string
    color: string
    is_deleted: boolean
}

export interface StatusResponse {
    getAllStatus: Status[];
}
export const GET_STATUS_LIST: TypedDocumentNode<{ getAllStatus: Status[] }> = gql`
    query getAllStatus {
        getAllStatus{
            _id
            name
            color
            is_deleted
        }
    }
`;
