import React from 'react';
import { EditTaskModal } from "features/edittodo/ui/EditTaskModal/EditTaskModal";
import { Task } from "features/addtodo/api/getTaskList";
import { useEditTaskModal } from "pages/TaskCategoriesPage/hooks/useEditTaskModal";import { useOutletContext,
    useParams
} from 'react-router-dom';
import { useFormatDate } from "shared/hooks/useFormatDate/useFormatDate";
import { EditButton } from "shared/ui/EditButton/EditButton";
import { DeleteButton } from "shared/ui/DeleteButton/DeleteButton";
import { useDeleteTask } from "shared/pages/TaskDetailsPage/model/useDeleteTask";


export const TaskDetailsPage = () => {
    const [modalState, dispatch] = useEditTaskModal();
    const [deleteTask] = useDeleteTask()
    const { refetch, allTasks } = useOutletContext<{ refetch: () => void; allTasks: Task[] | undefined }>();
    const { taskId } = useParams<{ taskId: string }>();
    const taskData = allTasks?.find(task => task.id === taskId && !task.is_deleted);
    const formattedDate = useFormatDate(taskData?._created_at);

   const handleOpenEditModal = () => {
        if (!taskData) return;
        dispatch({ type: 'OPEN_EDIT', payload: taskData.id  })
    }

    const handleCloseEditModal = () => {
        dispatch({ type: 'CLOSE_EDIT' });
        refetch();
    }

    const handleDeleteTaskButton = async () => {
       try {
           if (!taskId) return;
           await deleteTask({ variables: { taskId: taskId } });
           refetch();
       } catch (error) {
           console.log(error);
           refetch();
       }
    }

    return(
        <>
            {taskData &&
            <>
                <div className='relative'>
                    <div className='grid grid-cols-2 gap-4 mb-2.5'>
                        <img className="w-[158px] h-[158px] rounded-lg" src={taskData?.publicUrl} alt="task_image"/>
                        <div className='flex flex-col items-start gap-3'>
                            <h3 className='text-2xl font-bold'>{`${taskData?.title}`}</h3>
                            <p>
                                <span style={{ color: taskData?.priority.color }}>Priority:</span>
                                {`${taskData?.priority.name}`}
                            </p>
                            <p>
                                <span style={{ color: taskData?.status.color }}>Status:</span>
                                {`${taskData?.status.name}`}
                            </p>
                            <p className='text-[#A1A3AB] text-xs'>
                                {`Created on: ${formattedDate}`}
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col items-start '>
                        <p className='text-[#A1A3AB]' >
                            <span className=' font-bold'>Task title: </span>
                            {`${taskData?.title}`}
                        </p>
                        <p className='text-[#A1A3AB]' >
                            <span className=' font-bold'>Description: </span>
                            {`${taskData?.description}`}
                        </p>
                    </div>
                    <div className='flex gap-3 absolute left-[600px] top-[700px]'>
                        <EditButton
                            size='sm'
                            onClick={handleOpenEditModal}/>

                        <DeleteButton
                            onClick={handleDeleteTaskButton}
                            size='sm'/>
                    </div>
                </div>
                <EditTaskModal
                    isOpen={modalState.isOpenEdit}
                    closeModal={handleCloseEditModal}
                    taskId={taskData.id}
                />
            </>
            }
        </>
    )
};
