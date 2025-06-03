import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

interface GoogleOAuthProviderProps {
    children: React.ReactNode;
}

const clientId = '219458796440-d03a5948e0a4fgarr1oclr8jkirfapc2.apps.googleusercontent.com';
export const ProviderGoogleOAuth: React.FC<GoogleOAuthProviderProps> = ({children}) => {
    return (
        <GoogleOAuthProvider clientId={clientId}>
            {children}
        </GoogleOAuthProvider>
    )
}
