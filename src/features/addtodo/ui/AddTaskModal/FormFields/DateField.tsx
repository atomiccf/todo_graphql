import React from "react";
import { Controller, Control, FieldErrors } from 'react-hook-form'
import { InputField } from "features/addtodo/ui/AddTaskModal/InputField";
import { FormInput } from "features/addtodo/ui/AddTaskModal/AddTaskModal";
import styles from "features/addtodo/ui/AddTaskModal/AddTaskModal.module.css";


interface DateFieldProps {
    control: Control<FormInput>;
    errors: FieldErrors<FormInput>;
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
