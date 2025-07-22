import { useMutation } from "@apollo/client";
import { ADD_STATUS } from "../api/addStatus";

export const useAddStatus = () => {
    return useMutation(ADD_STATUS);
}
