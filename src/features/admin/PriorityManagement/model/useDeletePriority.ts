import { DELETE_PRIORITY } from "features/admin/PriorityManagement/api/deletePriority";
import { useMutation } from "@apollo/client";

export const useDeletePriority = () => {
    return useMutation(DELETE_PRIORITY);
}
