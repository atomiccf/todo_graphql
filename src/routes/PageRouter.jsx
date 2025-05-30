import { createBrowserRouter } from 'react-router-dom'
import { App } from '../App.jsx'
import { LoginPage } from '/src/pages/LoginPage/LoginPage.jsx'
import {RegistrationPage} from "../pages/RegistrationPage/RegistrationPage.jsx";
import {TaskPage} from "../pages/TaskPage/TaskPage.jsx";

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
