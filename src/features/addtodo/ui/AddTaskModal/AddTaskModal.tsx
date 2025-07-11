import React from 'react';
import { useForm } from "react-hook-form";
import { useGetCurrentUserId } from "shared/hooks/useGetCurrentUserId/useGetCurrentUserId";
import { Modal } from "shared/ui/Modal/Modal";
import { useAddTask } from "features/addtodo/model/useAddTask";
import { TitleField } from "features/addtodo/ui/AddTaskModal/FormFields/TitleField";
import { DateField } from "features/addtodo/ui/AddTaskModal/FormFields/DateField";
import { DescriptionField } from "features/addtodo/ui/AddTaskModal/FormFields/DescriptionField";
import { ImageField } from "features/addtodo/ui/AddTaskModal/FormFields/ImageField";
import { PriorityField } from "features/addtodo/ui/AddTaskModal/FormFields/PriorityField";

interface AddTaskModalProps {
    isOpen: boolean;
    closeModal: (value: boolean) => void
}

export interface FormInput {
    title: string;
    date: string;
    priority: string;
    description: string;
    image: File | null;

}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({isOpen, closeModal}: AddTaskModalProps) => {
    const [ addTask ] = useAddTask();
    const userId:string | null | undefined = useGetCurrentUserId();
    const {control, handleSubmit, formState: { errors }} = useForm<FormInput>({
        defaultValues: {
            title: '',
            date: '',
            priority: '',
            description: '',
            image: null,
        }
    });

    const onSubmit = async (data: FormInput) => {
        const fileToUpload:File | null = data?.image;
        await addTask({
            variables: {
                taskInput: {
                    userId: userId,
                    title: data.title,
                    date: data.date,
                    priority: data.priority,
                    description: data.description,
                    image: fileToUpload,
                }
            }
        })
        closeModal(false);
    };
    const handleBackButton = () => closeModal(false);
    return (
        <Modal isOpen={isOpen}>
            <div className="flex w-full items-center justify-between pl-6 pr-6 pt-5 pb-5">
            <span className='text-black bold'>
                <span className="underline decoration-[#FF6767] underline-4">Add</span>
                <span className="underline decoration-[#FF6767] underline-4">New</span>
                Task</span>
                <button
                    className="bg-white text-black flex items-center gap-1 px-3 py-2 rounded-lg border-none outline-none focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 hover:border-transparentt"
                    onClick={handleBackButton}
                >
                    Go Back
                </button>
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
                    onSubmit={() => handleSubmit}
                    type="submit"
                    className=" w-[90px] h-[34px] bg-[#F24E1E] text-white rounded mt-10  flex items-center justify-center">
                    Done
                </button>
            </form>

        </Modal>
    )
}
