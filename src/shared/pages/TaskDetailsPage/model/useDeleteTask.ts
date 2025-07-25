import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "shared/pages/TaskDetailsPage/api/deleteTask";

export const useDeleteTask = () => {
    return useMutation(DELETE_TASK)
}
