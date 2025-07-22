import React from "react";
import { useGetStatus } from "features/admin/StatusManagement/model/useGetStatus";
import { DeleteButton } from "shared/ui/DeleteButton/DeleteButton";
import { EditButton } from "shared/ui/EditButton/EditButton";
import { AddButton } from "shared/ui/AddButton/AddButton";
import { useStatusModal } from "features/admin/StatusManagement/model/hooks/useStatusModal";
import { AddStatusModal } from "features/admin/StatusManagement/ui/AddStatusModal/AddStatusModal";
import { EditStatusModal } from "features/admin/StatusManagement/ui/EditStatusModal/EditStatusModal";
import { useDeleteStatus } from "features/admin/StatusManagement/model/useDeleteStatus";


export const TaskStatusList:React.FC = () => {
    const { data: statusList, refetch } = useGetStatus();
    const [modalState, dispatch] = useStatusModal();
    const [deleteStatus] = useDeleteStatus();
    const existingStatuses = statusList?.getAllStatus.filter((status) => !status.is_deleted);

    const handleOpenAddModal = () => {
        dispatch({ type: 'OPEN_ADD' });
    };

    const handleCloseAddModal = async () => {
        dispatch({ type: 'CLOSE_ADD' });
        await refetch()
    };

    const handleOpenEditButton =  (_id: string) => {
        dispatch({ type: 'OPEN_EDIT', payload: _id  });
    }

    const handleCloseEditModal = async () => {
        dispatch({ type: 'CLOSE_EDIT' });
        await refetch()
    };

    const handleDeleteButton = async (_id: string) => {
        try {
            await deleteStatus({ variables: { _id } });

        } catch (e: unknown) {
            if (e instanceof Error) {
                alert(`Error deleting status: ${e.message}`);
            }
        }
        await refetch();
    };


    return (
        <>
            <div className="flex w-full items-center justify-between">
                <p className="text-md font-semibold"><span className="underline decoration-[#FF6767] decoration-2">Task</span> Status</p>
                <AddButton title="Add New Status" handleOpenModal={handleOpenAddModal}/>
            </div>

            <div className="w-full overflow-hidden rounded-lg border border-black mb-9">

                <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-center border-b border-r border-black">SN</th>
                        <th className="p-3 text-center border-b border-r border-black">Name</th>
                        <th className="p-3 text-center border-b border-r border-black">Color</th>
                        <th className="p-3 text-center border-b border-r border-black">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {existingStatuses?.map((status, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="p-3 border-b border-r border-black">{index + 1}</td>
                            <td className="p-3 border-b border-r border-black">{status.name}</td>
                            <td className="p-3 border-b border-r border-black">
                                <div className="flex items-center">
                                    <div
                                        className="w-4 h-4 mr-2 rounded-full border border-gray-300"
                                        style={{ backgroundColor: status.color }}
                                    />
                                    {status.color}
                                </div>
                            </td>
                            <td className="p-3 border-b border-r border-black">
                                <div className="flex items-center justify-center gap-2">
                                    <EditButton onClick={()=> handleOpenEditButton(status._id)} />
                                    <DeleteButton onClick={() => handleDeleteButton(status._id)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <AddStatusModal
            isOpen={modalState.isOpenAdd}
            closeModal={ handleCloseAddModal }
            />
            <EditStatusModal
                isOpen={modalState.isOpenEdit}
                statusId={modalState.editingStatusId}
                closeModal={ handleCloseEditModal }
            />
        </>
    );
};
