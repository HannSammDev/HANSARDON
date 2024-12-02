import React from "react";
import { Outlet } from 'react-router-dom'
import Sidenav from "./components/Dashbord/Sidenav";
import Topbar from "./components/Dashbord/Topbar";


function DashboardLayout() {
    return (

        <>
            <Topbar />
            <Outlet />
            <Sidenav />
        </>
      
    )
} export default DashboardLayout