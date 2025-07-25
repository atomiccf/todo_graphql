import React from "react";
import editIcon from 'assets/Edit.png'

interface EditButtonProps {
    size?: 'sm' | 'lg';
    onClick?: () => void;
}

export const EditButton: React.FC<EditButtonProps> = ({onClick, size}) => {
    return (
        <>
            {size === 'lg' && (
                <button className={`flex items-center w-[93px] h-[39px] bg-[#F24E1E] rounded-lg text-white py-2 px-4`}
                        onClick={onClick}>
                    <img
                        src={editIcon}
                        alt="Edit"
                        className="w-[20px] h-[20px]"
                    />
                    Edit
                    </button>
            )}
            {size === 'sm' && (
                <button
                    className={`flex items-center justify-center w-[36px] h-[36px] bg-[#F24E1E] rounded-lg text-white py-2 px-2`}
                    onClick={onClick}
                >
                    <img
                        src={editIcon}
                        alt="Edit"
                        className="w-[18px] h-[18px]"
                    />
                </button>
            )}

        </>

    )
};
