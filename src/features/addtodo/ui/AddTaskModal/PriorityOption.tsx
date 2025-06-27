import React from "react";

interface PriorityOptionProps {
    color: string;
    label: string;
    value: string;
    selected: boolean;
    onChange?: () => void;
}

export const PriorityOption: React.FC<PriorityOptionProps> = ({ color, label, value, selected, onChange }) => (

    <li className="flex items-center gap-1 mr-5">
        <span style={{ color: `${color}`}} className={` text-2xl mr-2`}>•</span>
        {label}
        <input
            type='checkbox'
            name="priority"
            value={value}
            checked={selected}
            onChange={onChange}
        />
    </li>
);
