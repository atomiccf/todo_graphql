import React, { useState } from 'react';
import Pending from "assets/Pending.png";
import { Task } from "features/addtodo/api/getTaskList";
import { AddTaskModal } from "./AddTaskModal/AddTaskModal";
import { TaskCard } from "shared/ui/TaskCard/TaskCard";
import { AddButton } from "shared/ui/AddButton/AddButton";

interface TaskListWithAddModalComponent {
    allTasks: Task[];
    refetchTasks?: () => void
}

const TaskListWithAddModalComponent:React.FC<TaskListWithAddModalComponent> = ({ allTasks, refetchTasks }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [showOlderTasks, setShowOlderTasks] = useState<boolean>(false);
    const today:Date = new Date();
    const day:number = today.getDay();
    const month:string = today.toLocaleString('en-US', { month: 'long' });

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
                <AddButton title='Add Task' handleOpenModal={handleOpenModal}/>
            </div>
            <div className="flex items-center justify-start self-start overflow-y-hidden">
            <span className='text-black text-xs font-medium'>{`${day} ${month}`}</span>
                <span style={{ color: `#ABAEB5`}} className={` text-2xl ml-2 `}>•</span>
                <span className='text-[#ABAEB5]'>Today</span>
            </div>
            <div className="flex flex-col items-center w-full gap-2 overflow-y-auto h-full p-3">
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
