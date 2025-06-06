import { User } from "shared/model/user/types";
import { useUserStore } from "shared/model/user/store";


export const DashboardPage = () => {
    const user:User | null = useUserStore(state => state.user);
    return (
        <>
            <div className="flex flex-col w-full items-start h-96 pl-16">
               <h1 className="text-black boldtext-4xl align-text-left mb-9">{`Welcome back, ${user?.getUser.first_name} \u{1F44B}`}</h1>
                <div className="min-w-[90%] min-h-screen border border-[#A1A3AB] p-6 ">
                    <h2 className="text-black text-2xl align-text-left">{`Welcome back, ${user?.getUser.first_name} \u{1F44B}`}</h2>
                </div>
            </div>

        </>

    )
}
