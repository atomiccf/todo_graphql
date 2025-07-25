import React from "react";
interface GoBackModalButtonProps {
    handleBackButton: () => void;
}

export const GoBackButton:React.FC<GoBackModalButtonProps> = ({handleBackButton}) => {
    return (
        <button
            className="underline decoration-black bg-transparent text-black flex items-center gap-1 px-3 py-2 rounded-xl border-none outline-none focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 hover:border-transparentt"
            onClick={handleBackButton}
        >
            Go Back
        </button>
    )
};
