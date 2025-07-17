import React from "react";

interface MetaDataFieldProps {
    priority: string;
    status: string;
    date: string;
}

const statusConfig = {
    in_progress: {
        color: '#0225FF',
        label: 'In Progress'
    },
    completed: {
        color: '#05A301',
        label: 'Completed'
    },
    not_started: {
        color: '#F21E1E',
        label: 'Not Started'
    },
} as const;

const priorityConfig = {
    moderate: {
        color: '#3ABEFF',
        label: 'Moderate'
    },
    low: {
        color: '#05A301',
        label: 'Low'
    },
    extreme: {
        color: '#F21E1E',
        label: 'Extreme'
    },
} as const;

export const MetaDataField: React.FC<MetaDataFieldProps> = ({ priority, status, date }) => {
    const configStatus = statusConfig[status as keyof typeof statusConfig]
    const configPriority = priorityConfig[priority as keyof typeof priorityConfig]
    const statusLabel = configStatus?.label || status
    const priorityLabel = configPriority?.label || priority

    return (
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-1">
                <span className="text-muted-foreground text-xs">Priority:</span>
                <span className="text-xs font-medium" style={{ color: configPriority?.color }}>
                    {priorityLabel}
                </span>
            </div>
            <div className="flex items-center gap-1">
                <span className="text-muted-foreground text-xs">Status:</span>
                <span className="text-xs font-medium" style={{ color: configStatus?.color }}>
                    {statusLabel}
                </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
                <span className='text-xs text-[#CBCDD5]'>Created on {date}</span>
            </div>
        </div>
    )
}
