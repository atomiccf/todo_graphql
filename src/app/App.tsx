import './App.css'
import React from 'react';
import { RequireAuth } from "features/require-auth";
import { Outlet } from "react-router-dom";


export const App = () => {

  return (
    <>
      <RequireAuth>
          <Outlet />
      </RequireAuth>
    </>
  )
}


