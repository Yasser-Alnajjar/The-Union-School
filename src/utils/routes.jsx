import AdmibLayout from "../layouts/AdmibLayout";
import LoginLayout from "../layouts/LoginLayout";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Notfound from "../layouts/Notfound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddClass from "../pages/classes/AddClass";
import EditClass from "../pages/classes/EditClass";
import Dashboard from "../pages/Dashboard";
import TeachresDetails from "../pages/classes/teachersDetails";
import Teachers from "../pages/Teachers";
import Schedule from "../pages/school/Schedule";
import SchoolDashborad from "../pages/school/SchoolDashborad";
import EditClassSchool from "../pages/school/EditClassSchool";
import Users from "../pages/school/Users";
import AddSchedule from "../pages/school/AddSchedule";
import EditSchedule from "../pages/school/EditSchedule";
import SchedulePage from "../pages/school/SchedulePage";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import axios from "axios";
import { API_URL } from "../api/Api_index";
import { header, user } from "../helpers/authHelp";
import ContactUs from "../pages/ContactUs";
import ContactDetails from "../pages/school/ContactDetails";
import About from "../pages/About";

export const routes = [
  // ? Root Route
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Notfound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "teachers",
        element: <Teachers />,
      },
      {
        path: "teachers/:id",
        element: <TeachresDetails />,
      },
      {
        path: "rootschedule",
        element: <SchedulePage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "/profile/edit",
        loader: async () => {
          const res = await axios.get(`${API_URL}/users/${user.id}`, {
            headers: {
              Authorization: header,
            },
          });
          const data = res.data;
          return data;
        },
        element: <EditProfile />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  // ? Login & Register Route
  {
    path: "/login",
    element: <LoginLayout />,
    children: [{ path: "", element: <Login /> }],
  },
  {
    path: "/register",
    element: <LoginLayout />,
    children: [{ path: "", element: <Register /> }],
  },
  // ? School Route
  {
    path: "admin",
    element: <AdmibLayout />,
    errorElement: <Notfound />,
    children: [
      { path: "", element: <SchoolDashborad /> },
      {
        path: "/admin/addclass",
        element: <AddClass />,
      },
      {
        path: "/admin/editclass/:id",
        element: <EditClassSchool />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      { path: "/admin/schedule", element: <Schedule /> },
      { path: "/admin/addschedule", element: <AddSchedule /> },
      { path: "/admin/editschedule/:editId", element: <EditSchedule /> },
      { path: "/admin/contact", element: <ContactDetails /> },
    ],
  },
  // ? Teachers Route
  {
    path: "admin-teachers",
    element: <AdmibLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      {
        path: "/admin-teachers/addclass",
        element: <AddClass />,
      },
      { path: "/admin-teachers/editclass/:id", element: <EditClass /> },
    ],
  },
];
