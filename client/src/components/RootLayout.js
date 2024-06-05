import React from 'react'
import Navbar from './Navbar/Navbar';
import Footercomp from './Footercomp/Footercomp';
import {Outlet} from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        <Navbar/>
        <div style={{ minHeight: "100vh", backgroundColor: "#cdaf92" }}>
        <Outlet/>
        </div>
        <Footercomp/>
        </div>
  );
}

export default RootLayout;