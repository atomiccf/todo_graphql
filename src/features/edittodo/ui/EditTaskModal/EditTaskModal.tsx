import React from "react";
import { useForm } from "react-hook-form";
import { Modal } from "shared/ui/Modal/Modal";
import { GoBackButton } from "shared/ui/GoBackButton/GoBackButton";
import { TitleField } from "shared/ui/TaskFormDataFields/TitleField";
import { DateField } from "shared/ui/TaskFormDataFields/DateField";
import { PriorityField } from "shared/ui/TaskFormDataFields/PriorityField";
import { DescriptionField } from "shared/ui/TaskFormDataFields/DescriptionField";
import { ImageField } from "shared/ui/TaskFormDataFields/ImageField";
import { useGetCurrentUserId } from "shared/hooks/useGetCurrentUserId/useGetCurrentUserId";
import { TaskFormData } from "shared/types/FormTypes";
import { useEditTask } from "features/edittodo/model/useEditTask";

interface EditTaskModalProps {
    isOpen: boolean;
    taskId: string;
    closeModal: () => void;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({isOpen, closeModal, taskId}) => {

    const userId:string | null | undefined = useGetCurrentUserId();
    const [updateTask] = useEditTask();
    const {control, handleSubmit, formState: { errors }, reset, clearErrors} = useForm<TaskFormData>({
        defaultValues: {
            title: '',
            date: '',
            priority: '',
            description: '',
            image: null,
        }
    });

    const handleBackButtonEditTaskModal  = () => {
        closeModal();
        reset();
        clearErrors(['title', 'date', 'priority', 'description', 'image']);
    }

    const onSubmit = async (data: TaskFormData) => {
        try {
            await updateTask({
                variables: {
                    taskUpdateInput: {
                        taskId: taskId,
                        title: data.title,
                        date: data.date,
                        priority: data.priority,
                        description: data.description,
                        image: data.image,
                        userId: userId
                    }
                }
            })
            reset();
            closeModal();
        } catch (e:unknown) {
            if (e instanceof Error) {
                reset()
                closeModal();
                alert(`Error updating task: ${e.message}`)
            }
        }

    }

    return (
        <Modal
        isOpen={isOpen}
        >
            <div className="flex w-full items-center justify-between pl-6 pr-6 pt-5 pb-5">
            <span className='text-black bold'>
                <span className="underline decoration-[#FF6767] underline-4">Edit</span>
                Task</span>
                <GoBackButton handleBackButton={handleBackButtonEditTaskModal}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-3 border border-[#B7B8BF] px-4 py-3.5 w-[794px] h-[476px]">
                <TitleField
                    control={control}
                    errors={errors}
                />
                <DateField
                    control={control}
                    errors={errors}
                />
                <PriorityField control={control} errors={errors}/>
                <div className='flex items-center w-full justify-between '>
                    <DescriptionField control={control} errors={errors}/>
                    <ImageField control={control} errors={errors}/>
                </div>
                <button
                    aria-label={'Done'}
                    type="submit"
                    className=" w-[90px] h-[34px] bg-[#F24E1E] text-white rounded mt-10  flex items-center justify-center">
                    Done
                </button>
            </form>
        </Modal>
    )
};
