import React, {useState} from 'react';
import Pending from "assets/Pending.png";
import { Task } from "features/addtodo/api/getTaskList";
import { AddTaskModal } from "./AddTaskModal/AddTaskModal";
import { TaskCard } from "features/addtodo/ui/TaskCard/TaskCard";

interface TaskListWithAddModalComponent {
    allTasks: Task[];
    refetchTasks?: () => void
}

const TaskListWithAddModalComponent:React.FC<TaskListWithAddModalComponent> = ({ allTasks, refetchTasks }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [showOlderTasks, setShowOlderTasks] = useState<boolean>(false);
    const today = new Date();
    const day = today.getDay();
    const month = today.toLocaleString('en-US', { month: 'long' });

    const todayTasks:Task[] = allTasks.filter(task => {
        const date = new Date(Number(task._created_at));
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    });

    const olderTasks:Task[] = allTasks.filter(task => {
        const date = new Date(Number(task._created_at));
        return (
            date.getDate() !== today.getDate() ||
            date.getMonth() !== today.getMonth() ||
            date.getFullYear() !== today.getFullYear()
        );
    });

    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => {
        if (refetchTasks){
            refetchTasks();
        }
        setOpenModal(false);
    }

    return (
        <div className="flex flex-col w-1/2 items-center h-full rounded-lg bg-white p-4 ">
            <div className="flex w-full items-center gap-[100px] pl-6 pr-6 pt-5 pb-5">
                <div className="flex items-center">
                    <img src={Pending} alt="Pending"/>
                    <span className='text-[#FF6767]'>To-Do</span>
                </div>
                <button
                    onClick={handleOpenModal}
                    className='bg-white text-[#ABAEB5] flex items-center ml-[247px] px-3 py-2 rounded-lg border-none outline-none focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 hover:border-transparentt'>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0595 8.19048H8.19048V12.0595C8.19048 12.2648 8.10895 12.4616 7.96383 12.6067C7.81871 12.7518 7.62189 12.8333 7.41667 12.8333C7.21144 12.8333 7.01462 12.7518 6.8695 12.6067C6.72438 12.4616 6.64286 12.2648 6.64286 12.0595V8.19048H2.77381C2.56858 8.19048 2.37176 8.10895 2.22664 7.96383C2.08153 7.81872 2 7.62189 2 7.41667C2 7.21144 2.08153 7.01462 2.22664 6.8695C2.37176 6.72438 2.56858 6.64286 2.77381 6.64286H6.64286V2.77381C6.64286 2.56858 6.72438 2.37176 6.8695 2.22664C7.01462 2.08153 7.21144 2 7.41667 2C7.62189 2 7.81871 2.08153 7.96383 2.22664C8.10895 2.37176 8.19048 2.56858 8.19048 2.77381V6.64286H12.0595C12.2648 6.64286 12.4616 6.72438 12.6067 6.8695C12.7518 7.01462 12.8333 7.21144 12.8333 7.41667C12.8333 7.62189 12.7518 7.81872 12.6067 7.96383C12.4616 8.10895 12.2648 8.19048 12.0595 8.19048Z" fill="#F24E1E"/>
                    </svg>
                    <span className='text-xs text-[#B6B8C0] '>Add task</span>
                </button>

            </div>
            <div className="flex items-center justify-start self-start overflow-y-hidden  ">
            <span className='text-black text-xs font-medium'>{`${day} ${month}`}</span>
                <span style={{ color: `#ABAEB5`}} className={` text-2xl ml-2 `}>•</span>
                <span className='text-[#ABAEB5]'>Today</span>
            </div>
            <div className="flex flex-col items-center w-full gap-2 overflow-y-auto h-full">
                {todayTasks.length > 0 ? (
                    todayTasks.map((task: Task) => (
                        <TaskCard key={task.title} task={task} />
                    ))
                ) : (
                    <div className="text-center text-sm text-gray-400 italic">
                        No tasks for today
                    </div>
                )}
                {olderTasks.length > 0 && (
                    <>
                        <button
                            className="text-xs text-[#6B7280] bg-gray-100 mt-4 self-start border-none outline-none focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 hover:border-transparentt"
                            onClick={() => setShowOlderTasks(prev => !prev)}
                        >
                            {showOlderTasks ? 'Hide earlier tasks ▲' : 'Show earlier tasks ▼'}
                        </button>

                        {showOlderTasks && (
                            <div className="mt-2 flex flex-col gap-2 border-t border-gray-200 pt-2">
                                {olderTasks.map((task: Task) => (
                                    <TaskCard key={task.title} task={task} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            <AddTaskModal
                isOpen={openModal}
                closeModal={handleCloseModal}
            />
        </div>
    )
}

export const TaskListWithAddModal = React.memo(TaskListWithAddModalComponent);
