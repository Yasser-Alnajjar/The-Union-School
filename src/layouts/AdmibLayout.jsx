import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import SidebarAdmin from "../components/SidebarAdmin";

export default function AdmibLayout() {
  const { dashboard } = useSelector((state) => state.dashboard);
  const { getSchool } = useSelector((state) => state);

  return (
    <>
      {getSchool.isLoading && <Loading />}
      {dashboard.isLoading && <Loading />}
      <div className="m-0 p-0 d-flex ">
        <SidebarAdmin />
        <Outlet />
      </div>
    </>
  );
}
