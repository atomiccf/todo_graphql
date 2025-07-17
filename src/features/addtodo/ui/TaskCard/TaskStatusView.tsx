import React, { memo } from 'react';

interface TaskStatusViewProps {
    status: 'in_progress' | 'completed' | 'not_started';
}

const statusConfig = {
    in_progress: {
        borderColor: '#0225FF',
    },
    completed: {
        borderColor: '#05A301',
    },
    not_started: {
        borderColor: '#F21E1E',
    },
} as const;

const TaskStatusViewComponent: React.FC<TaskStatusViewProps> = ({ status }) => {
    const config = statusConfig[status];

    if (!config) return null;

    return (
        <div className="w-5 h-5 rounded-full bg-white border-4 flex-shrink-0" style={{ borderColor: config.borderColor }} />
    );
};

export const TaskStatusView = memo(TaskStatusViewComponent);
