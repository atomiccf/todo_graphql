import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { TaskCard } from "shared/ui/TaskCard/TaskCard";
import { NotSelectedTask } from "shared/ui/NotSelectedTask/NotSelectedTask";
import { Task } from "features/addtodo/api/getTaskList";

type TasksLayoutProps = {
    tasks: Task[];
    filterDescription?: string; // e.g. "Extreme" or "all"
    refetch: () => void;
};

export const TasksLayout: React.FC<TasksLayoutProps> = ({ tasks, filterDescription, refetch }) => {
    return (
        <div className="flex w-[90%] items-start h-full border border-[#A1A3AB] rounded-lg px-7 py-7 gap-2.5">
            <div className="flex w-2/5 h-full items-start border border-[#A1A3AB] rounded-lg px-7 py-7">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <NavLink
                            to={`/app/tasks/${task.id}`}
                            state={{ taskData: task }}
                            key={task.id}
                            className={({ isActive }) => (isActive ? "opacity-50 bg-gray-100" : "hover:bg-gray-50")}
                        >
                            <TaskCard task={task} />
                        </NavLink>
                    ))
                ) : (
                    <div className="text-gray-400 italic">No {filterDescription || "tasks"} yet</div>
                )}
            </div>
            <div className="flex w-3/5 h-full items-start border border-[#A1A3AB] rounded-lg px-7 py-7">
                {tasks.length === 0 ? <NotSelectedTask /> : <Outlet context={{ refetch, allTasks: tasks }} />}
            </div>
        </div>
    );
};
