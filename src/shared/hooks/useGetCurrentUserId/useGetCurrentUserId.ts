import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedUserData {
    userId: string
}

export const useGetCurrentUserId = () => {
    let decodedUserData: DecodedUserData | null
    const accessToken = useMemo(() => localStorage.getItem('jwt'), []);
    if (accessToken) {
        decodedUserData = jwtDecode(accessToken);
        return decodedUserData?.userId
    }
    return null
}
