import React from "react";
import { useGetPriority } from "features/admin/PriorityManagement/model/useGetPriority";
import { usePriorityModal } from "features/admin/PriorityManagement/model/hooks/usePriorityModal";
import { useDeletePriority } from "features/admin/PriorityManagement/model/useDeletePriority";
import { EditButton } from "shared/ui/EditButton/EditButton";
import { DeleteButton } from "shared/ui/DeleteButton/DeleteButton";
import { AddPriorityModal } from "features/admin/PriorityManagement/ui/AddPriorityModal/AddPriorityModal";
import { AddButton } from "shared/ui/AddButton/AddButton";
import { EditPriorityModal } from "features/admin/PriorityManagement/ui/EditPriorityModal/EditPriorityModal";

export const TaskPriorityList:React.FC = () => {
    const [modalState, dispatch] = usePriorityModal();
    const [deletePriority] = useDeletePriority();
    const { data: priorityList, refetch } = useGetPriority();
    const existingPriorities = priorityList?.getAllPriorities.filter((priority) => !priority.is_deleted);
    console.log('existingPriorities', existingPriorities)

    const handleOpenAddModalPriority = () => {
        dispatch({ type: 'OPEN_ADD' });
    };

    const handleCloseAddModalPriority = async () => {
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
            await deletePriority({ variables: { _id } });

        } catch (e: unknown) {
            if (e instanceof Error) {
                alert(`Error deleting priority: ${e.message}`);
            }
        }
        await refetch();
    };

    return (
        <>
            <div className="flex w-full items-center justify-between">
                <p className="text-md font-semibold"><span className="underline decoration-[#FF6767] decoration-2">Task</span> Priority</p>
                <AddButton title="Add New Priority" handleOpenModal={handleOpenAddModalPriority}/>
            </div>

            <div className="w-full overflow-hidden rounded-lg border border-black">
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
                    {existingPriorities?.map((priority, index) => (
                        <tr key={priority._id} className="hover:bg-gray-50">
                            <td className="p-3 border-b border-r text-center border-black">{index + 1}</td>
                            <td className="p-3 border-b border-r text-center border-black">{priority.name}</td>
                            <td className="p-3 border-b border-r text-center border-black">
                                <div className="flex items-center">
                                    <div
                                        className="w-4 h-4 mr-2 rounded-full text-center border border-gray-300"
                                        style={{ backgroundColor: priority.color }}
                                    />
                                    {priority.color}
                                </div>
                            </td>
                            <td className="p-3 border-b border-r border-black ">
                                <div className="flex items-center justify-center gap-2">
                                    <EditButton
                                    size="lg"
                                    onClick={()=>handleOpenEditButton(priority._id)}
                                    />
                                    <DeleteButton size="lg" onClick={()=>handleDeleteButton(priority._id)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <AddPriorityModal
                isOpen={ modalState.isOpenAdd }
                closeModal={ handleCloseAddModalPriority }
            />
            <EditPriorityModal
                priorityId={ modalState?.editingPriorityId }
                isOpen={ modalState.isOpenEdit }
                closeModal={ handleCloseEditModal }
            />
        </>

    );
};

