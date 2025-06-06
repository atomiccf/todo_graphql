import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
    query getUser($ID: ID!) {
        getUser(id: $ID) {
           username
           email
           first_name
           last_name
        }
    }
`;
