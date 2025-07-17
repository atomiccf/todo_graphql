import React from 'react';
import { useFormatDate } from "shared/hooks/useFormatDate";
import { TaskStatusView } from "features/addtodo/ui/TaskCard/TaskStatusView";
import dotedMenu from "assets/doted_menu.png";
import { MetaDataField } from "features/addtodo/ui/TaskCard/MetaDataField";

interface Task {
    title: string;
    description: string;
    publicUrl: string;
    priority: string;
    _created_at: string;
}

interface TaskCardProps {
    task: Task
}

const TaskCardComponent: React.FC<TaskCardProps> = ({ task }: TaskCardProps) => {
    const date = useFormatDate(task._created_at);

    return (
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 mb-3">
            <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        <TaskStatusView status={'not_started'} />
                        <h3 className="font-semibold text-base leading-tight text-gray-900 line-clamp-2 min-w-0">{task.title}</h3>
                    </div>
                   <img
                        src={dotedMenu}
                        alt="Doted menu"
                    />
                </div>
                <div className="flex gap-3">
                    <p
                        className="text-sm text-gray-600 flex-1 min-w-0"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {task.description}
                    </p>
                    {task.publicUrl && (
                        <div className="flex-shrink-0">
                            <img
                                className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                                src={task.publicUrl || "/placeholder.svg?height=80&width=80"}
                                alt="Task attachment"
                            />
                        </div>
                    )}
                </div>
                <MetaDataField priority={task.priority} status={'not_started'} date={date} />
            </div>
        </div>
    )
};

export const TaskCard = React.memo(TaskCardComponent);
