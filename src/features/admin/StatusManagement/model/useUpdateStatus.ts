import { useMutation } from "@apollo/client";
import { UPDATE_STATUS, UpdateStatusResult } from "../api/updateStatus";

export const useUpdateStatus = () => {
    return useMutation<UpdateStatusResult>(UPDATE_STATUS);
};
