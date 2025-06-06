import { useGetCurrentDate } from "widgets/Header/lib/hooks/useGetCurrentDate";

export const DateDisplay = () => {
    const {currentDay, date} = useGetCurrentDate()
    return (
        <div>
            <div className="text-black">{currentDay}</div>
            <div className="text-[#3abeff]">{date}</div>
        </div>
    )
}
