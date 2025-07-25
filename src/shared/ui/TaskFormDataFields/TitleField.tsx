import React from "react";
import { Controller, Control, FieldErrors } from 'react-hook-form'
import styles from "features/addtodo/ui/AddTaskModal/AddTaskModal.module.css";
import { InputField } from "shared/ui/InputField/InputField";
import { TaskFormData } from "shared/types/FormTypes";

interface TitleFieldProps {
    control: Control<TaskFormData>;
    errors: FieldErrors<TaskFormData>;
}

export const TitleField: React.FC<TitleFieldProps> = ({ control, errors }) => (
    <Controller
        name="title"
        control={control}
        rules={{ required: 'Title is required', minLength: { value: 3, message: 'Minimum 3 characters' } }}
        render={({ field }) => (
            <>
                <InputField
                    id="title"
                    label="Title"
                    type="text"
                    value={field.value}
                    onChange={field.onChange}
                    inputClassName={styles.input_title}

                >
                 {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
                </InputField>
            </>
        )}
    />
);
