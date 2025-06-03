import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../api/loginUser';

export const useLogin = () => {
    return useMutation(USER_LOGIN);
};
