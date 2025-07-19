import React from "react";
import { Priority, Status} from "features/addtodo/ui/TaskCard/TaskCard";

interface MetaDataFieldProps {
    priority: Priority;
    status: Status;
    date: string;
}
export const MetaDataField: React.FC<MetaDataFieldProps> = ({ priority, status, date }) => {

    return (
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-1">
                <span className="text-muted-foreground text-xs">Priority:</span>
                <span className="text-xs font-medium" style={{ color: priority.color }}>
                    {priority.name}
                </span>
            </div>
            <div className="flex items-center gap-1">
                <span className="text-muted-foreground text-xs">Status:</span>
                <span className="text-xs font-medium" style={{ color: status.color }}>
                    {status.name}
                </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
                <span className='text-xs text-[#CBCDD5]'>Created on {date}</span>
            </div>
        </div>
    )
}
