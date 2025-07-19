import './App.css'
import React from 'react';
import { RequireAuth } from "features/require-auth";
import { Header } from "widgets/Header/ui/Header";
import { Outlet } from "react-router-dom";
import { NavigationSidebar } from "features/navigationSidebar/ui/NavigationSidebar";
import { useFetchCurrentUser } from "shared/hooks/useFetchCurrentUser/useFetchCurrentUser";


export const App = () => {

  useFetchCurrentUser();

  return (
    <>
      <RequireAuth>
          <Header />
          <div className="flex w-[100vw] h-[100vh]">
              <NavigationSidebar />
              <div className="w-full h-full ml-[76px] mr-[76px] pb-[24px]">
                  <Outlet />
              </div>
          </div>
      </RequireAuth>
    </>
  )
}


