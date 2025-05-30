import {jwtDecode} from "jwt-decode";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {gql, useMutation} from "@apollo/client";

const REFRESH_TOKEN = gql`
    mutation refreshToken {
        refreshToken {
            accessToken
        }
    }
`;

export const RequireAuth = ({ children }) => {
    const accessToken = localStorage.getItem('jwt');
    const navigate = useNavigate();
    const [refreshToken, { loading, error }] = useMutation(REFRESH_TOKEN, {
        onCompleted: (data) => {
            console.log('data', data);
        },
        onError: () => {

            navigate('/');
        },
    });


    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = localStorage.getItem('jwt');
            if (!accessToken) {
                navigate('/');
                return;
            }

            try {
                const decoded = jwtDecode(accessToken);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp < currentTime) {
                    await refreshToken();
                }
            } catch (e) {
                navigate('/');
            }
        };

        checkAuth();
    }, [navigate, accessToken]);

    return <>{children}</>
}
