import {gql, TypedDocumentNode} from "@apollo/client";

export const CREATE_USER: TypedDocumentNode<{ createUser: { accessToken: string }}>  = gql`
    mutation CreateUser($userInput: UserInput!) {
        createUser(userInput: $userInput) {
            accessToken
        }
    }
`;
