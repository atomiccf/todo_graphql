import React from "react";
import { Controller, Control, FieldErrors } from 'react-hook-form'
import { InputField } from "shared/ui/InputField/InputField";
import styles from "./PriorityNameField.module.css";
import { PriorityFormInput } from "features/admin/PriorityManagement/ui/AddPriorityModal/AddPriorityModal";


interface PriorityNameFieldProps {
    control: Control<PriorityFormInput>;
    errors: FieldErrors<PriorityFormInput>;
    shouldRequireName?:boolean
}

export const PriorityNameField: React.FC<PriorityNameFieldProps> = ({ control, errors, shouldRequireName }) => (
    <Controller
        name="name"
        control={control}
        rules={
        {   required: shouldRequireName ? 'Name is required' : false,
            minLength: { value: 3, message: 'Minimum 3 characters' }
        }}
        render={({ field }) => (
            <>
                <InputField
                    id="name"
                    label="Task Priority Name"
                    type="text"
                    value={field.value}
                    onChange={field.onChange}
                    inputClassName={styles.priority_input}

                >
                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                </InputField>

            </>
        )}
    />
);
