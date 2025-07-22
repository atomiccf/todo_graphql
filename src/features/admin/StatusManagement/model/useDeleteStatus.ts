import { DELETE_STATUS } from "features/admin/StatusManagement/api/deleteStatus";
import { useMutation } from "@apollo/client";

export const useDeleteStatus = () => {
    return useMutation(DELETE_STATUS);
}
