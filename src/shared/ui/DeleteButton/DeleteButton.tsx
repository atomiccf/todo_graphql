import React from "react";
import deleteIcon from "assets/Trash.png";



interface DeleteButtonProps {
    size?: 'sm' | 'lg';
    onClick?: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick,size }) => {
    return(
        <>
            {size === 'lg' && (
                <button className="flex items-center w-[110px] h-[39px] bg-[#F24E1E] rounded-lg text-white py-2 px-4" onClick={onClick}>
                    <img
                        src={deleteIcon}
                        alt="Delete"
                        className="w-[20px] h-[20px]"
                    />
                    Delete
                </button>
            )}
            {size === 'sm' && (
                <button
                    className="flex items-center justify-center w-[36px] h-[36px] bg-[#F24E1E] rounded-lg text-white py-2 px-2"
                    onClick={onClick}
                >
                    <img
                        src={deleteIcon}
                        alt="Delete"
                        className="w-[18px] h-[18px]"
                    />
                </button>
            )}
        </>


        )



};
