import { useMutation } from '@apollo/client';
import { GOOGLE_AUTH } from 'shared/api/graphql/googleAuth';

export const useGoogleAuth = () => {
        return useMutation(GOOGLE_AUTH);
};
