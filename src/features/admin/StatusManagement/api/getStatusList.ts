import { gql, TypedDocumentNode } from "@apollo/client";


interface Status {
    name: string
    color: string
}

export interface StatusResponse {
    getAllStatus: Status[];
}
export const GET_STATUS_LIST: TypedDocumentNode<{ getAllStatus: Status[] }> = gql`
    query getAllStatus {
        getAllStatus{
            name
            color
        }
    }
`;
