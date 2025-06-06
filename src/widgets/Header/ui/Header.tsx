import { DateDisplay } from "widgets/Header/ui/DateDisplay";
import { LogoDisplay } from "widgets/Header/ui/LogoDisplay";
import { TaskSearchInput } from "features/taskSearch/ui/TaskSearchInput";
import { Notifications } from "features/notifications/ui/Notifications";
import { Calendar } from "features/calendar/ui/Calendar";

export const Header = () => {


    return (
       <header className="flex items-center justify-around px-4 py-2 h-[100px] bg-white">
         <LogoDisplay />
         <TaskSearchInput />
         <div className="flex items-center">
            <Notifications />
            <Calendar />
         </div>
         <DateDisplay />
       </header>
    );
};
