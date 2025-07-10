import React from "react";
import { Controller, Control, FieldErrors } from 'react-hook-form'
import { FormInput } from "features/addtodo/ui/AddTaskModal/AddTaskModal";
import {PriorityOption} from "features/addtodo/ui/AddTaskModal/PriorityOption";

interface PriorityFieldProps {
    control: Control<FormInput>;
    errors: FieldErrors<FormInput>;
}

export const PriorityField:React.FC<PriorityFieldProps> = ({control, errors,  }) => {
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
                         {[
                             { color: "#F21E1E", label: "Extreme", value: "extreme" },
                             { color: "#3ABEFF", label: "Moderate", value: "moderate" },
                             { color: "#05A301", label: "Low", value: "low" },
                         ].map(option => (
                             <PriorityOption
                                 key={option.value}
                                 color={option.color}
                                 label={option.label}
                                 value={option.value}
                                 selected={field.value === option.value}
                                 onChange={() => field.onChange(option.value)}
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
