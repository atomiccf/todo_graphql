import { User } from "shared/model/user/types";
import { useUserStore } from "shared/model/user/store";
import { TaskListWithAddModal } from "features/addtodo/ui/TaskListWithAddModal";
import { useGetCurrentUserId } from "shared/hooks/useGetCurrentUserId/useGetCurrentUserId";
import { useGetTasks } from "features/addtodo/model/useGetTasks";


export const DashboardPage = () => {
    const user:User | null = useUserStore(state => state.user);
    const userId:string | null | undefined = useGetCurrentUserId();
    const { data, refetch } = useGetTasks(userId);
    console.log('data', data)
    const allTasks = data?.getAllTasks;

    console.log('allTasks', allTasks)
    return (
        <>
            <div className="flex flex-col w-full items-start h-screen">
               <h1 className="text-black boldtext-4xl align-text-left mb-9">{`Welcome back, ${user?.getUser.first_name} \u{1F44B}`}</h1>
                <div className="w-[90%] h-full  border border-[#A1A3AB] p-4 ">
                    <TaskListWithAddModal
                    allTasks={allTasks || []}
                    refetchTasks={refetch}
                    />
                </div>
            </div>

        </>

    )
}
