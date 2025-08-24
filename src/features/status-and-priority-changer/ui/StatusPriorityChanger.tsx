import React from 'react'
import { useGetStatus } from "features/admin/StatusManagement/model/useGetStatus";
import { useGetPriority } from "features/admin/PriorityManagement/model/useGetPriority";
import { TaskDropdown } from "widgets/task-dropdown/ui/TaskDropdown";
import { useUpdateTaskStatus } from "features/status-and-priority-changer/model/useUpdateTaskStatus";
import { useUpdateTaskPriority } from "features/status-and-priority-changer/model/useUpdateTaskPriority";

interface StatusPriorityChangerProps {
    taskId: string
    refetch?: (() => void) | (() => void | undefined) | undefined;
}


export const StatusPriorityChanger:React.FC<StatusPriorityChangerProps> = ({ taskId, refetch }) => {
    const { data: statusList,  } = useGetStatus();
    const { data: priorityList,  } = useGetPriority();
    const [ updateTaskStatus ] = useUpdateTaskStatus();
    const [ updateTaskPriority ] = useUpdateTaskPriority();

    const filteredStatusList = statusList?.getAllStatus?.filter((status) => !status.is_deleted);
    const filteredPriorityList = priorityList?.getAllPriorities?.filter((priority) => !priority.is_deleted);

    const handleStatusChange = async (statusId: string) => {
       try {
           await updateTaskStatus({
               variables: {
                   taskUpdateStatusInput: {
                       taskId,
                       statusId,
                   }
               }
           })
           if (refetch) {
               refetch()
           }
       } catch (e) {
           console.error(e)
       }
    }

    const handlePriorityChange = async (priorityId: string) => {
        try {
            await updateTaskPriority({
                variables: {
                    taskUpdatePriorityInput: {
                        taskId,
                        priorityId,
                    }
                }
            })
            if (refetch) {
                refetch()
            }
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <TaskDropdown
        statusList={filteredStatusList}
        priorityList={filteredPriorityList}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
        />
    )


}
