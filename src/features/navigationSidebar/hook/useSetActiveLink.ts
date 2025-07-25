import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useSetActiveLink = (): string => {
    const [activeLink, setActiveLink] = useState<string>('')
    const location = useLocation();
    useEffect(() => {
        const currentPath:string = location.pathname.split('/')[2];
        const pages:string[] = ['dashboard', 'categories', 'vitals', 'tasks']

        if (pages.includes(currentPath)) {
            setActiveLink(pages[pages.indexOf(currentPath)])
        } else {
            setActiveLink('')
        }

    }, [location])

    return activeLink
}
