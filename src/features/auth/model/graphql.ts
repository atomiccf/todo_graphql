import { gql, TypedDocumentNode } from "@apollo/client";
export const USER_LOGIN: TypedDocumentNode<
    { loginUser: { accessToken: string } }> = gql`
    mutation loginUser($loginInput: LoginInput!) {
        loginUser(loginInput: $loginInput) {
            accessToken
        }
    }
`;
