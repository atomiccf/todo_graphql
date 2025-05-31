import {gql, TypedDocumentNode} from "@apollo/client";

export const CREATE_USER: TypedDocumentNode<{ createUser: { username: string, password: string, email: string, first_name: string, last_name: string, terms: boolean } }>  = gql`
    mutation CreateUser($userInput: UserInput!) {
        createUser(userInput: $userInput) {
            username
            password
            email
            first_name
            last_name
            terms
        }
    }
`;
