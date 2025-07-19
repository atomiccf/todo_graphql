import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export const useSetActiveLink = (): string => {
    const [activeLink, setActiveLink] = useState<string>('')
    const location = useLocation();
    useEffect(() => {
        const currentPath = location.pathname

        if (currentPath.includes('dashboard')) {
            setActiveLink('dashboard')
        } else if (currentPath.includes('categories')) {
            setActiveLink('categories')
        } else if (currentPath.includes('settings')) {
            setActiveLink('settings')
        } else if (currentPath.includes('users')) {
            setActiveLink('users')
        } else {
            setActiveLink('')
        }

    }, [location])

    return activeLink
}
