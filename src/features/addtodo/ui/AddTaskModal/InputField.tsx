import React from 'react'

interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
    inputClassName?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, onChange, className, inputClassName }) => {
    return (
        <div className={className ? className : "flex flex-col items-start w-full"} >
            <label className="text-black font-bold mb-1" htmlFor={id}>{label}</label>
            <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`${inputClassName} rounded border `}
                />
        </div>
    )
}
