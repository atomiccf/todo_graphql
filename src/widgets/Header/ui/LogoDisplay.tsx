import { useLocation } from "react-router-dom";


export const LogoDisplay = () => {
    const location = useLocation()

    return (
        <div className="ml-[72px] mr-36">
           {location.pathname === '/app/dashboard' &&
               <h1 className="text-3xl font-bold">
                   <span className="text-[#ff6767]">Dash</span><span className="text-black">board</span>
               </h1>
           }
           {location.pathname !== '/app/dashboard' &&
               <h1 className="text-3xl font-bold">
                   <span className="text-[#ff6767]">To</span><span className="text-black">-Do</span>
               </h1>
           }
        </div>

    )
}
