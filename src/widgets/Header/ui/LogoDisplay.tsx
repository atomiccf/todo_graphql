import {useLocation} from "react-router-dom";


export const LogoDisplay = () => {
    const location = useLocation()

    console.log('location', location.pathname);


    return (
        <div>
           {location.pathname === '/app/dashboard' &&
               <h1 className="text-2xl font-bold">
                   <span className="text-[#ff6767]">Dash</span><span className="text-black">board</span>
               </h1>
           }
           {location.pathname === '/app/to-do' &&
               <h1 className="text-2xl font-bold">
                   <span className="text-[#ff6767]">To</span><span className="text-black">-Do</span>
               </h1>}
        </div>

    )
}
