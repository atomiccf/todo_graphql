import { gql, TypedDocumentNode } from "@apollo/client";

interface DeletePriorityResult {
    deletePriority: string;
}
interface DeletePriorityVariable {
    _id: string;
}
export const DELETE_PRIORITY: TypedDocumentNode<DeletePriorityResult, DeletePriorityVariable> = gql`
    mutation deletePriority($_id: String!) {
        deletePriority(_id: $_id) 
    }
`;
