import React from "react";
import { Controller, Control, FieldErrors } from 'react-hook-form'
import { PriorityOption } from "shared/ui/TaskFormDataElements/PriorityOption";
import { TaskFormData } from "shared/types/FormTypes";
import {useGetPriority} from "features/admin/PriorityManagement/model/useGetPriority";

interface PriorityFieldProps {
    control: Control<TaskFormData>;
    errors: FieldErrors<TaskFormData>;
}

export const PriorityField:React.FC<PriorityFieldProps> = ({control, errors,  }) => {
    const { data: priorityList } = useGetPriority();
    const existingPriorities = priorityList?.getAllPriorities.filter((priority) => !priority.is_deleted);
    console.log('existingPriorities', existingPriorities)
 return(
     <>
         <label htmlFor="priority" className="text-black text-sm font-semibold">Priority</label>
         <Controller
             name="priority"
             control={control}
             rules={{ required: "Priority is required" }}
             render={({ field }) => (
                 <div className="flex items-center w-full gap-2">
                     <ul className="flex items-start gap-2">
                         {existingPriorities?.map(option => (
                             <PriorityOption
                                 key={option._id}
                                 color={option.color}
                                 label={option.name}
                                 value={option.name}
                                 selected={field.value === option.name}
                                 onChange={() => field.onChange(option.name)}
                             />
                         ))}
                     </ul>
                     {errors.priority && <span className=" text-xs text-red-500">{errors.priority.message}</span>}
                 </div>
             )}
         />
     </>
 )
}
