import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from 'app/App';
import { LoginPage } from 'pages/LoginPage/ui/LoginPage';
import { RegistrationPage } from 'pages/RegistrationPage/ui/RegistrationPage';
import { DashboardPage } from 'pages/DashboardPage/ui/DashboardPage';
import { TaskCategoriesPage } from 'pages/TaskCategoriesPage/ui/TaskCategoriesPage';

export const routes = [
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
        children: [
            {
                path: 'dashboard',
                element: <DashboardPage />,
            },
            {
                path: 'categories',
                element: <TaskCategoriesPage />,
            },
        ],
    },
];

export const router = createBrowserRouter(routes);
