import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import NavbarCompnent from "../components/NavbarCompnent";

export default function RootLayout() {
  const { getSchool } = useSelector((state) => state);

  return (
    <>
      {getSchool.isLoading && <Loading />}
      <NavbarCompnent />
      <Outlet />
      <Footer />
    </>
  );
}
