import React from "react";
import { useForm } from "react-hook-form";
import { Modal } from "shared/ui/Modal/Modal";
import { GoBackButton } from "shared/ui/GoBackButton/GoBackButton";

import { StatusFormInput } from "features/admin/StatusManagement/ui/AddStatusModal/AddStatusModal";
import { StatusNameField } from "features/admin/StatusManagement/ui/FormFields/StatusNameField/StatusNameField";
import { StatusColorField } from "features/admin/StatusManagement/ui/FormFields/StatusColorField/StatusColorField";
import {useUpdateStatus} from "features/admin/StatusManagement/model/useUpdateStatus";


interface EditStatusModalModalProps {
    isOpen: boolean;
    statusId: string | null;
    closeModal: () => void;
}


export const EditStatusModal:React.FC<EditStatusModalModalProps> = ({isOpen, statusId, closeModal}) => {
    const [updateStatus] = useUpdateStatus()


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

    const { control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<StatusFormInput>({});

    const onSubmit = async (data: StatusFormInput) => {
        console.log('data', data)
        try {
            await updateStatus({
                variables: {
                    updateInput: {
                        _id: statusId,
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
                alert(`Error updating priority: ${e.message}`)
            }
        }


    };


    return (
        <Modal isOpen={ isOpen }>
            <div className="flex w-full items-center justify-between pl-6 pr-6 pt-5 pb-5">
                <p className="text-md font-semibold"><span
                    className="underline decoration-[#FF6767] decoration-2">Edit</span> Task Status</p>
                <GoBackButton handleBackButton={ handleBackButton }/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col items-start gap-3 border border-[#B7B8BF] px-4 py-3.5 w-[794px] h-[476px]">
                <StatusNameField
                    control={control}
                    errors={errors}
                    shouldRequireName={false}
                />
                <StatusColorField
                    control={control}
                    errors={errors}
                    shouldRequireColor={false}
                />
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        className="bg-[#F24E1E] text-white text-sm font-semibold py-2 px-4 rounded"

                    >
                        Update
                    </button>
                    <button
                        type="button"
                        className="bg-[#F24E1E] text-white text-sm font-semibold py-2 px-4 rounded"
                        onClick={ handleCancelButton }
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>

    )
}
