import React from 'react';
import { FieldErrors } from "react-hook-form";
import { TaskFormData } from "shared/types/FormTypes";
import dragImg from 'assets/Drag&Drop.png';

interface FileUploadSectionProps {
    value?: File | null;
    onChange: (file: File) => void;
    errors?: FieldErrors<TaskFormData>;
}

export const FileUploadSection: React.FC<FileUploadSectionProps> = ({ value, onChange,errors }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            onChange(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div className='flex flex-col items-start w-[30%]'>
            <label className="text-black text-sm font-semibold mb-1" htmlFor="upload">Upload Image</label>
            <div
                className='flex flex-col items-center gap-8 border border-[#565454] w-[214px] max-h-[205px] rounded py-3'
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <img className='mt-2' src={dragImg} alt="Drag&Drop icon"/>
                <span className="text-[#B7B8BF] text-sm">Drag&Drop files here or</span>
                <div className="flex items-center space-x-4">
                    <label
                        htmlFor="upload"
                        className="cursor-pointer inline-flex items-center justify-center
                            w-[74px] h-[28px] border border-gray-400
                            text-[#B7B8BF] text-sm rounded bg-transparent hover:bg-gray-100 transition"
                    >
                        Browse
                    </label>
                    <input
                        id="upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
                {value && (
                    <div className="text-sm text-gray-600">
                        Выбран файл: {value.name}
                    </div>
                )}
            </div>
            {errors?.image && <span className="text-red-500 text-xs">{`${errors?.image.message}`}</span>}
        </div>
    );
};
