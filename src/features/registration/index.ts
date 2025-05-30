import {gql,TypedDocumentNode} from "@apollo/client";

export const CREATE_USER:TypedDocumentNode<
    { createUser: { username: string; password: string; first_name: string; last_name: string; } }> = gql`
    mutation CreateUser($userInput: UserInput!) {
        createUser(userInput: $userInput) {
            username
            password
            first_name
            last_name
        }
    }
`;
