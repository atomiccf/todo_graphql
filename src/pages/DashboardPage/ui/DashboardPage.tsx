import { User } from "shared/model/user/types";
import { useUserStore } from "shared/model/user/store";
import {TaskListWithAddModal} from "features/addtodo/ui/TaskListWithAddModal";


export const DashboardPage = () => {
    const user:User | null = useUserStore(state => state.user);
    return (
        <>
            <div className="flex flex-col w-full items-start h-screen ml-[76px] mr-[76px]">
               <h1 className="text-black boldtext-4xl align-text-left mb-9">{`Welcome back, ${user?.getUser.first_name} \u{1F44B}`}</h1>
                <div className="w-[90%] h-[77%]  border border-[#A1A3AB] p-4 ">
                    <TaskListWithAddModal />
                </div>
            </div>

        </>

    )
}
