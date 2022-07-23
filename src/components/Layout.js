import useTheme from "../hooks/useTheme";
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  const { theme } = useTheme();
  return (
    <main
      className={theme}
      style={{ paddingBottom: "1rem", minHeight: "100vh" }}
    >
      <NavBar />

      <Outlet />
    </main>
  );
}
