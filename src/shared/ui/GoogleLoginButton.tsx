import {CredentialResponse, GoogleLogin} from '@react-oauth/google';
import { useGoogleAuth } from "features/authByGoogle/model/useGoogleAuth";
import { useNavigate } from "react-router-dom";

export const GoogleLoginButton = () => {
    const [googleAuth, ] = useGoogleAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = async (credentialResponse:CredentialResponse) => {
        try {
            const id_token =  credentialResponse.credential;

            const result = await googleAuth({
                variables: {
                    googleAuthInput: {
                        idToken: id_token
                    }
                },
            });

            const token = result.data?.googleAuth?.accessToken ;
            console.log('token', token);

            if (token) {
                localStorage.setItem('jwt', token);
                navigate('/app/dashboard');
            } else {
                console.error('Token not received');
            }
        } catch (err) {
            console.error('Google auth error:', err);
        }
    }

    return (

        <GoogleLogin
            type="icon"
            onSuccess={handleGoogleLogin}
            onError={() => console.error('Login Failed')}
            useOneTap={false}
            context='use'
            ux_mode="popup"
        />

    )
}
