import React from 'react';
import Pending from "assets/Pending.png";
import { AddTaskModal } from "./AddTaskModal/AddTaskModal";


export const TaskListWithAddModal:React.FC = () => {
    const [openModal, setOpenModal] = React.useState(false);

    const handleOpenModal = () => setOpenModal(true);
    return (
        <div className="flex flex-col w-1/2 h-full rounded-lg bg-white p-4 ">
            <div className="flex w-full items-center justify-between pl-6 pr-6 pt-5 pb-5">
                <div className="flex items-center">
                    <img src={Pending} alt="Pending"/>
                    <span className='text-[#FF6767]'>To-Do</span>
                </div>
                <button
                    onClick={handleOpenModal}
                    className='bg-white text-[#ABAEB5] flex items-center gap-1 px-3 py-2 rounded-lg border-none outline-none focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 hover:border-transparentt'>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0595 8.19048H8.19048V12.0595C8.19048 12.2648 8.10895 12.4616 7.96383 12.6067C7.81871 12.7518 7.62189 12.8333 7.41667 12.8333C7.21144 12.8333 7.01462 12.7518 6.8695 12.6067C6.72438 12.4616 6.64286 12.2648 6.64286 12.0595V8.19048H2.77381C2.56858 8.19048 2.37176 8.10895 2.22664 7.96383C2.08153 7.81872 2 7.62189 2 7.41667C2 7.21144 2.08153 7.01462 2.22664 6.8695C2.37176 6.72438 2.56858 6.64286 2.77381 6.64286H6.64286V2.77381C6.64286 2.56858 6.72438 2.37176 6.8695 2.22664C7.01462 2.08153 7.21144 2 7.41667 2C7.62189 2 7.81871 2.08153 7.96383 2.22664C8.10895 2.37176 8.19048 2.56858 8.19048 2.77381V6.64286H12.0595C12.2648 6.64286 12.4616 6.72438 12.6067 6.8695C12.7518 7.01462 12.8333 7.21144 12.8333 7.41667C12.8333 7.62189 12.7518 7.81872 12.6067 7.96383C12.4616 8.10895 12.2648 8.19048 12.0595 8.19048Z" fill="#F24E1E"/>
                    </svg>
                    <span>Add task</span>
                </button>
            </div>
            <AddTaskModal
                isOpen={openModal}
                closeModal={setOpenModal}
            />
        </div>
    )
}
