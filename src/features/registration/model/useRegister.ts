import { useMutation } from '@apollo/client';
import { CREATE_USER } from "../api/registerUser";

export const useRegister = () => {
    return useMutation(CREATE_USER);
}
