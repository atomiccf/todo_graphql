import React from "react";
import { Controller, Control, FieldErrors } from 'react-hook-form'
import { FileUploadSection } from "shared/ui/TaskFormDataElements/FileUploadSection";
import { TaskFormData } from "shared/types/FormTypes";

interface ImageFieldProps {
    control: Control<TaskFormData>;
    errors: FieldErrors<TaskFormData>;
}

export const ImageField: React.FC<ImageFieldProps> = ({control, errors}) => (
    <Controller
        name="image"
        control={control}
        render={({field: {onChange, value}}) => (
            <>
                <FileUploadSection
                    value={value}
                    onChange={(file: File) => onChange(file)}
                    errors={errors}
                />

            </>

        )}
        rules={{
            required: "File is required",
        }}
    />
);
