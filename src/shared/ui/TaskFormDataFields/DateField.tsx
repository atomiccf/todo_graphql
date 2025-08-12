import React from "react";
import { Controller, Control, FieldErrors } from 'react-hook-form'
import styles from "features/addtodo/ui/AddTaskModal/AddTaskModal.module.css";
import { InputField } from "shared/ui/InputField/InputField";
import { TaskFormData } from "shared/types/FormTypes";


interface DateFieldProps {
    control: Control<TaskFormData>;
    errors: FieldErrors<TaskFormData>;
}

export const DateField: React.FC<DateFieldProps> = ({ control, errors }) => (
    <Controller
        name="date"
        control={control}
        rules={{ required: 'Date is required' }}
        render={({ field }) => (
            <>
                <InputField
                    id="date"
                    label="Date"
                    type="date"
                    value={field.value}
                    onChange={field.onChange}
                    inputClassName={styles.input_date}
                >
                {errors.date && <span className="text-red-500 text-xs">{errors.date.message}</span>}
                </InputField>

            </>
        )}
    />
);
