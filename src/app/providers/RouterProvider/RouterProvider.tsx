import React from "react";
import { router } from "./PageRouter";
import { RouterProvider } from "react-router-dom";

export const Router: React.FC = () => {
    return <RouterProvider router={router} />;
};
