import React from "react";
import { Controller, Control, FieldErrors } from 'react-hook-form'
import styles from "features/addtodo/ui/AddTaskModal/AddTaskModal.module.css";
import { TaskFormData } from "shared/types/FormTypes";


interface DescriptionField {
    control: Control<TaskFormData>;
    errors: FieldErrors<TaskFormData>;
}

export const DescriptionField: React.FC<DescriptionField> = ({ control, errors }) => {
    return (
        <Controller
            name="description"
            control={control}
            render={({field: {onChange, value}}) => (
                <>
                    <div className="flex flex-col items-start w-[70%]">
                    <label className="text-sm text-black font-semibold mb-1" htmlFor="description">Description</label>
                    <textarea
                        id='description'
                        name="description"
                        placeholder="Start writing here..."
                        className={styles.input_description}
                        onChange={onChange}
                        value={value}
                    >
                    </textarea>
                    {errors.description && <span className="text-red-500 text-xs">{`${errors.description.message}`}</span>}
                    </div>

                </>
            )}
            rules={{
                required: "Description is required",
                minLength: {value: 3, message: "Minimum 3 characters"}
            }}
        />
    )
}
