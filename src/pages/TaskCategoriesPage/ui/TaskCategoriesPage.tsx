import React from "react";
import { useNavigate } from "react-router-dom";
import { TaskStatusList } from "features/admin/StatusManagement/ui/TaskStatusList";
import { TaskPriorityList } from "features/admin/PriorityManagement/ui/TaskPriorityList";
import {GoBackButton} from "shared/ui/GoBackButton/GoBackButton";

export const TaskCategoriesPage = () => {
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate('/app/dashboard');
    };
    return (
      <div className='flex flex-col w-[90%] items-start h-full border border-[#A1A3AB] rounded-lg px-7'>
        <div className="flex items-center justify-between mb-4 w-full pt-4">
            <h2 className="text-2xl font-semibold">
                <span className="underline decoration-[#FF6767] decoration-2 ">Task</span> Categories
            </h2>
            <GoBackButton handleBackButton={handleBackButton}/>
        </div>
          <TaskStatusList />
          <TaskPriorityList />
      </div>
    );
};
