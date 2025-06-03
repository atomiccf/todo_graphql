import { gql } from '@apollo/client';

export const GOOGLE_AUTH = gql`
    mutation googleAuth($googleAuthInput: GoogleAuthInput!) {
        googleAuth(googleAuthInput: $googleAuthInput) {
            accessToken
        }
    }
`;
