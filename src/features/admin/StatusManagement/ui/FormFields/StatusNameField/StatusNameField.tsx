import React from "react";
import styles from "./StatusNameField.module.css";
import { Controller, Control, FieldErrors } from 'react-hook-form'
import { InputField } from "shared/ui/InputField/InputField";
import { StatusFormInput } from "features/admin/StatusManagementManagement/ui/AddStatusModal/AddStatusModal";

interface StatusNameFieldProps {
    control: Control<StatusFormInput>;
    errors: FieldErrors<StatusFormInput>;
    shouldRequireName?:boolean
}

export const StatusNameField: React.FC<StatusNameFieldProps> = ({ control, errors, shouldRequireName }) => (
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
                    label="Status Priority Name"
                    type="text"
                    value={field.value}
                    onChange={field.onChange}
                    inputClassName={styles.status_input}

                >
                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                </InputField>
            </>
        )}
    />
);
