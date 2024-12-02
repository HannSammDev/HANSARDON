import React from "react";
import {Outlet} from 'react-router-dom'
import Header from "./components/Home/Header.jsx";
import Footer from "./components/Home/Footer.jsx";
import Login from "./components/Home/login.jsx";


function Layout(){
    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}export default Layout