import { createBrowserRouter } from 'react-router-dom'
import { App } from 'app/App'
import { LoginPage } from 'pages/LoginPage/ui/LoginPage'
import { RegistrationPage } from "pages/RegistrationPage/ui/RegistrationPage";
import {TaskPage} from "pages/TaskPage/ui/TaskPage";
import React from 'react';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />,

    },
    {
        path: '/register',
        element: <RegistrationPage />,

    },
    {
        path: '/app',
        element: <App />,
        errorElement: '',
        children: [
            {
                path: 'main',
                element: <TaskPage />
            }
        ]
    },

])
