import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from 'app/App';
import { LoginPage } from 'pages/LoginPage/ui/LoginPage';
import { RegistrationPage } from 'pages/RegistrationPage/ui/RegistrationPage';
import { DashboardPage } from 'pages/DashboardPage/ui/DashboardPage';
import { TaskCategoriesPage } from 'pages/TaskCategoriesPage/ui/TaskCategoriesPage';
import { TasksPage } from "pages/TasksPage";
import { TaskDetailsPage } from "shared/pages/TaskDetailsPage/ui/TaskDetailsPage";
import { VitalTaskPage } from "pages/VitalTaskPage";

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
            {
                path: 'vitals',
                element: <VitalTaskPage />,
                children: [
                    {
                        path: ':taskId',
                        element:<TaskDetailsPage /> ,
                    },
                ]
            },
            {
                path: 'tasks',
                element: <TasksPage />,
                children: [
                    {
                        path: ':taskId',
                        element:<TaskDetailsPage /> ,
                    },
                ],
            },
            {
                path: 'settings',
                element: '',
            }
        ],
    },
];

export const router = createBrowserRouter(routes);
