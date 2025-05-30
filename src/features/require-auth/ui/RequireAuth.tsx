import React,{ReactNode, useEffect} from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {REFRESH_TOKEN} from "../model/graphql";

type RequireAuthProps = {
    children: ReactNode
}

export const RequireAuth:React.FC<RequireAuthProps> = ({ children }) => {
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
                const decoded:JwtPayload = jwtDecode(accessToken);
                const currentTime:number = Math.floor(Date.now() / 1000);

                if (decoded.exp && decoded.exp < currentTime) {
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
