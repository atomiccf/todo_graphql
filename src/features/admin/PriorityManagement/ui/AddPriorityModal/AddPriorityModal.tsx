import React from "react";
import { useForm } from "react-hook-form";
import { Modal } from "shared/ui/Modal/Modal";
import { GoBackButton } from "shared/ui/GoBackButton/GoBackButton";
import {
    PriorityNameField
} from "features/admin/PriorityManagement/ui/FormFields/PriorityNameField/PriorityNameField";
import {
    PriorityColorField
} from "features/admin/PriorityManagement/ui/FormFields/PriorityColorField/PriorityColorField";

import { useAddPriority } from "features/admin/PriorityManagement/model/useAddPriority";


export interface PriorityFormInput {
    name: string;
    color: string;
}

interface AddPriorityModalProps {
    isOpen: boolean
    closeModal: () => void
}

export const AddPriorityModal: React.FC<AddPriorityModalProps> = ({isOpen, closeModal}) => {

    const [addPriority] = useAddPriority();
    const { control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<PriorityFormInput>({
        defaultValues: {
            name: '',
            color: '',
        }
    });

    const onSubmit = async (data: PriorityFormInput) => {
        console.log('data', data)
        try {
            await addPriority({
                variables: {
                    priorityInput: {
                        name: data.name,
                        color: data.color
                    }
                }
            })
            reset()
            closeModal();
        } catch (e: unknown) {
            if (e instanceof Error) {
                reset()
                closeModal();
                alert(`Error creating priority: ${e.message}`)
            }
        }

    };

    const handleBackButton = () => {
        reset()
        clearErrors()
        closeModal()
    };

    const handleCancelButton = () => {
        reset()
        clearErrors()
        closeModal()
    };

    return (
        <Modal isOpen={isOpen}>
            <div className="flex w-full items-center justify-between pl-6 pr-6 pt-5 pb-5">
                <p className="text-md font-semibold"><span
                    className="underline decoration-[#FF6767] decoration-2">Add</span> Task Priority</p>
                <GoBackButton handleBackButton={handleBackButton}/>
            </div>
            <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col items-start gap-3 border border-[#B7B8BF] px-4 py-3.5 w-[794px] h-[476px]">
                <PriorityNameField
                    control={control}
                    errors={errors}
                />
                <PriorityColorField
                    control={control}
                    errors={errors}
                />
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        className="bg-[#F24E1E] text-white text-sm font-semibold py-2 px-4 rounded"

                    >
                        Create
                    </button>
                    <button
                        type="button"
                        className="bg-[#F24E1E] text-white text-sm font-semibold py-2 px-4 rounded"
                        onClick={handleCancelButton}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}
