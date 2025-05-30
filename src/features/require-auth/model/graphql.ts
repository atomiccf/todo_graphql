import { gql, TypedDocumentNode } from "@apollo/client";

export const REFRESH_TOKEN: TypedDocumentNode<
    { refreshToken: { accessToken: string } },
    {}
> = gql`
    mutation refreshToken {
        refreshToken {
            accessToken
        }
    }
`;
