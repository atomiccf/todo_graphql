import React from 'react'

interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
    inputClassName?: string;
    children?: React.ReactNode | null
}

export const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, onChange, className, inputClassName, children }) => {
    return (
        <div className={className ? className : "flex flex-col items-start w-full"} >
            <label className="text-black text-sm font-semibold mb-1" htmlFor={id}>{label}</label>
            <div className="flex items-center w-full gap-2">
                <input
                    aria-label={label}
                    type={type}
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`${inputClassName} rounded border `}
                />
                {children}
            </div>

        </div>
    )
}
