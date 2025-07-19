import React, { memo } from 'react';

interface TaskStatusViewProps {
    status: string;
}



const TaskStatusViewComponent: React.FC<TaskStatusViewProps> = ({ status }) => {
    return (
        <div className="w-5 h-5 rounded-full bg-white border-4 flex-shrink-0" style={{ borderColor: status }} />
    );
};

export const TaskStatusView = memo(TaskStatusViewComponent);
