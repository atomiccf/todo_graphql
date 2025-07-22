import React from "react";
import { Controller, Control, FieldErrors } from 'react-hook-form'
import { InputField } from "shared/ui/InputField/InputField";
import styles from "features/admin/StatusManagement/ui/FormFields/StatusColorField/StatusColorField.module.css";
import { StatusFormInput } from "features/admin/StatusManagement/ui/AddPriorityModal/AddPriorityModal";


interface StatusColorFieldProps {
    control: Control<StatusFormInput>;
    errors: FieldErrors<StatusFormInput>;
    shouldRequireColor?:boolean
}

const isHexColor = (color: string) => /^#([A-Fa-f0-9]{6})$/.test(color);

export const StatusColorField: React.FC<StatusColorFieldProps> = ({ control, errors,  shouldRequireColor}) => (
    <Controller
        name="color"
        control={control}
        rules={{
            required: shouldRequireColor ? 'Color is required' : false,
            validate: (value) => {
                if (shouldRequireColor && !isHexColor(value)) {
                    return 'Color must be a valid hex code (e.g. #FF0000)';
                }
                return true;
            },
        }}
        render={({ field }) => (
            <>
                <InputField
                    id="color"
                    label="Task Priority Color"
                    type="text"
                    value={field.value}
                    onChange={field.onChange}
                    inputClassName={styles.status_input}

                >
                    {errors.color && <span className="text-xs text-red-500">{errors.color.message}</span>}
                </InputField>
            </>
        )}
    />
);
