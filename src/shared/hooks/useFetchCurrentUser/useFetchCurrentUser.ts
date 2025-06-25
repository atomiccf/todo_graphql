import { GET_CURRENT_USER } from 'shared/api/graphql/getCurrentUser';
import { useQuery } from '@apollo/client';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useUserStore } from "shared/model/user/store";
import { useEffect, useMemo} from "react";

interface DecodedUserData extends JwtPayload {
    userId: string
}

export const useFetchCurrentUser = () => {

    const accessToken = useMemo(() => localStorage.getItem('jwt'), []);
    const setUser = useUserStore((state) => state.setUser);

    if (!accessToken) return ;
    const decodedUserData:DecodedUserData | null  = jwtDecode(accessToken);

    const { data } = useQuery(GET_CURRENT_USER, {
        variables: { ID: decodedUserData?.userId },
        skip: !decodedUserData
    });

    useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data])

}
