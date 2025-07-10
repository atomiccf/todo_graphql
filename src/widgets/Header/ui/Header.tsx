import { DateDisplay } from "widgets/Header/ui/DateDisplay";
import { LogoDisplay } from "widgets/Header/ui/LogoDisplay";
import { TaskSearchInput } from "features/taskSearch/ui/TaskSearchInput";
import { Notifications } from "features/notifications/ui/Notifications";
import { Calendar } from "features/calendar/ui/Calendar";

export const Header = () => {


    return (
       <header className="flex items-center justify-start px-4 pt-9 pb-6 h-[100px] bg-[#F8F8F8]">
         <LogoDisplay />
         <TaskSearchInput />
         <div className="flex items-center gap-[9px] mr-20">
            <Notifications />
            <Calendar />
         </div>
         <DateDisplay />
       </header>
    );
};
