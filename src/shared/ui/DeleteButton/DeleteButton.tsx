import React from "react";
import style from "./DeleteButton.module.css";



interface DeleteButtonProps {
    onClick?: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
    return <button className="flex items-center w-[110px] h-[39px] bg-[#F24E1E] rounded-lg text-white py-2 px-4" onClick={onClick}>
        <span className={style.image}></span>Delete
    </button>;
};
