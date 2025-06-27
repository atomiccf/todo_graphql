import React from "react";
import { Controller, Control, FieldErrors } from 'react-hook-form'
import { FormInput } from "features/addtodo/ui/AddTaskModal/AddTaskModal";
import { FileUploadSection } from "features/addtodo/ui/AddTaskModal/FileUploadSection";

interface ImageFieldProps {
    control: Control<FormInput>;
    errors: FieldErrors<FormInput>;
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
