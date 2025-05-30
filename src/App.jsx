import './App.css'

import {RequireAuth} from "./components/RequareAuth/RequireAuth.jsx";
import {Outlet} from "react-router-dom";

export const App = () => {

  return (
    <>
      <RequireAuth>
          <Outlet />
      </RequireAuth>
    </>
  )
}


