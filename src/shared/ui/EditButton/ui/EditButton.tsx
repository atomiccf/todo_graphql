import React from "react";
import style from './EditButton.module.css'



interface EditButtonProps {
    onClick?: () => void;
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
    return <button className={`flex items-center w-[93px] h-[39px] bg-[#F24E1E] rounded-lg text-white py-2 px-4`} onClick={onClick}>
        <span className={style.image}></span>Edit
    </button>;
};
