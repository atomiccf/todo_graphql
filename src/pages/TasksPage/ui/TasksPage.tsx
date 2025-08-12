import React from 'react';
import { useGetCurrentUserId } from "shared/hooks/useGetCurrentUserId/useGetCurrentUserId";
import { useGetTasks } from "features/addtodo/model/useGetTasks";
import {TasksLayout} from "shared/ui/TasksLayout/TasksLayout";


export const TasksPage = () => {
    const userId = useGetCurrentUserId();
    const { data, refetch } = useGetTasks(userId);

    const allTasks = (data?.getAllTasks || []).filter((task) => !task.is_deleted);

    return <TasksLayout tasks={allTasks} refetch={refetch} filterDescription="tasks" />;

};
