import React from "react";

interface PriorityOptionProps {
    color: string;
    label: string;
    value: string;
    selected: boolean;
    onChange?: () => void;
}

export const PriorityOption: React.FC<PriorityOptionProps> = ({ color, label, value, selected, onChange }) => {
    return (  <li className="flex items-center gap-1 mr-5 text-[#B7B8BF] text-sm">
        <span style={{ color: `${color}`}} className={` text-2xl mr-2 `}>•</span>
        {label}
        <input
            className=""
            type='checkbox'
            name="priority"
            value={value}
            checked={selected}
            onChange={onChange}
        />
    </li>
    )
}

