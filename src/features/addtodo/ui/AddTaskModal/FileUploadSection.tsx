import React from 'react';
import dragImg from 'assets/Drag&Drop.png';

interface FileUploadSectionProps {
    value?: File | null;
    onChange: (file: File) => void;
}

export const FileUploadSection: React.FC<FileUploadSectionProps> = ({ value, onChange }) => {
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
        <div className='flex flex-col items-start w-[45%]'>
            <label className="text-black font-bold" htmlFor="upload">Upload Image</label>
            <div
                className='flex flex-col items-center gap-10 border border-[#565454] w-1/2 h-52 rounded'
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <img className='mt-2' src={dragImg} alt="Drag&Drop icon"/>
                <span>Drag&Drop files here or</span>
                <div className="flex items-center space-x-4">
                    <label
                        htmlFor="upload"
                        className="cursor-pointer inline-flex items-center justify-center
                            w-[74px] h-[28px] border border-gray-400
                            text-gray-700 text-sm rounded bg-transparent hover:bg-gray-100 transition"
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
        </div>
    );
};
