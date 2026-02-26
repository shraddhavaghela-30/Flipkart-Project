import React from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}
