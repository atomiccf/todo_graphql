import React from 'react';
import styles from './AddTaskModal.module.css'
import { Modal } from "shared/ui/Modal/Modal";
import { FileUploadSection } from "features/addtodo/ui/AddTaskModal/FileUploadSection";
import { PriorityOption } from "features/addtodo/ui/AddTaskModal/PriorityOption";
import { InputField } from "features/addtodo/ui/AddTaskModal/InputField";
import { useForm, Controller } from "react-hook-form";
import { useAddTask } from "features/addtodo/model/useAddTask";
import { useGetCurrentUserId } from "shared/hooks/useGetCurrentUserId/useGetCurrentUserId";

interface AddTaskModalProps {
    isOpen: boolean;
    closeModal: (value: boolean) => void
}

interface FormInput {
    title: string;
    date: string;
    priority: string;
    description: string;
    image: File | null;

}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({isOpen, closeModal}: AddTaskModalProps) => {
    const {control, handleSubmit, formState: { errors }} = useForm<FormInput>({
        defaultValues: {
            title: '',
            date: '',
            priority: '',
            description: '',
            image: null,
        }
    });

    const [ addTask ] = useAddTask();
    const userId:string | null | undefined = useGetCurrentUserId();


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
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-3 border border-[#B7B8BF] px-4 py-3.5">
                <Controller
                    name="title"
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <>
                            <InputField
                                id="title"
                                label="Title"
                                type="text"
                                value={value}
                                onChange={onChange}
                                inputClassName={styles.input_title}
                            />
                            {errors.title && <span className="text-red-500">{`${errors.title.message}`}</span>}
                        </>
                    )}
                    rules={{
                        required: "Title is required",
                        minLength: {value: 3, message: "Minimum 3 characters"}
                    }}
                />
                <Controller
                name="date"
                control={control}
                render={({field: {onChange, value}}) => (
                    <>
                        <InputField
                            id="date"
                            label="Date"
                            type="date"
                            value={value}
                            onChange={onChange}
                            inputClassName={styles.input_date}
                        />
                        {errors.date && <span className="text-red-500">{`${errors.date.message}`}</span>}
                    </>
                )}
                rules={{
                    required: "Date is required",
                }}
                />
                <label className="text-black font-bold" htmlFor="priority">Priority</label>
                <Controller
                    name='priority'
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <>
                            <ul className="flex items-start gap-2 ">
                                <PriorityOption
                                    color="#F21E1E"
                                    label="Extreme"
                                    value="Extreme"
                                    selected={value === 'extreme'}
                                    onChange={() => onChange('extreme')}
                                />
                                <PriorityOption
                                    color="#3ABEFF"
                                    label="Moderate"
                                    value='moderate'
                                    selected={value === 'moderate'}
                                    onChange={() => onChange('moderate')}
                                />
                                <PriorityOption
                                    color="#05A301"
                                    label="Low"
                                    value='low'
                                    selected={value === 'low'}
                                    onChange={() => onChange('low')}
                                />
                            </ul>
                            {errors.priority && <span className="text-red-500">{`${errors.priority.message}`}</span>}
                        </>
                    )}
                    rules={{
                        required: "Priority is required",
                    }}

                />

                <div className='flex items-start w-full justify-between '>
                    <Controller
                    name="description"
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <>
                            <InputField
                                id="description"
                                label="Description"
                                type="description"
                                value={value}
                                onChange={onChange}
                                inputClassName={styles.input_description}
                                className='flex flex-col items-start w-[50%]'
                            />
                            {errors.description && <span className="text-red-500">{`${errors.description.message}`}</span>}
                        </>
                    )}
                    rules={{
                        required: "Description is required",
                        minLength: {value: 3, message: "Minimum 3 characters"}
                    }}
                    />
                    <Controller
                    name="image"
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <>
                            <FileUploadSection
                                value={value}
                                onChange={(file: File) => onChange(file)}
                            />
                            {errors.image && <span className="text-red-500">{`${errors.image.message}`}</span>}
                        </>
                    )}
                    rules={{
                        required: "File is required",
                    }}
                    />
                </div>
                <button
                    onSubmit={() => handleSubmit}
                    type="submit"
                    className=" w-[90px] h-[34px] bg-[#F24E1E] text-white rounded mt-10 ml-20 flex items-center justify-center">
                    Done
                </button>
            </form>

        </Modal>
    )
}
