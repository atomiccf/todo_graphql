import { useMutation } from '@apollo/client';
import { GOOGLE_AUTH } from 'features/authByGoogle/api/googleAuth';

export const useGoogleAuth = () => {
        return useMutation(GOOGLE_AUTH);
};
