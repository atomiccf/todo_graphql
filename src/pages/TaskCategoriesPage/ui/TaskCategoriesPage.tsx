import React from "react";
import { useNavigate } from "react-router-dom";
import { TaskStatusList } from "features/admin/StatusManagement/ui/TaskStatusList";
import { TaskPriorityList } from "features/admin/PriorityManagement/ui/TaskPriorityList";

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
            <button
                className="underline decoration-black bg-transparent text-black flex items-center gap-1 px-3 py-2 rounded-xl border-none outline-none focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 hover:border-transparentt"
                onClick={handleBackButton}
            >
                Go Back
            </button>

        </div>
          <TaskStatusList />
          <TaskPriorityList />
      </div>
    );
};
