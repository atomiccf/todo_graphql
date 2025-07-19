import React from "react";
import { useGetStatus } from "features/admin/StatusManagement/model/useGetStatus";
import {DeleteButton} from "shared/ui/DeleteButton/ui/DeleteButton";
import {EditButton} from "shared/ui/EditButton/ui/EditButton";


export const TaskStatusList:React.FC = () => {
    const { data: statusList } = useGetStatus();
    return (
        <>
            <p className="text-md font-semibold mb-4"><span className="underline decoration-[#FF6767] decoration-2">Task</span> Status</p>
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
                    {statusList?.getAllStatus.map((status, index) => (
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
                                    <EditButton />
                                    <DeleteButton />
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>

    );
};
