import { useMutation } from "@apollo/client";
import { ADD_PRIORITY } from "../api/addPriority";

export const useAddPriority = () => {
    return useMutation(ADD_PRIORITY);
}
