import App from "@/App";
import About from "@/pages/About";
import ContactPage from "@/pages/ContactPage";
import Faq from "@/pages/Faq";
import Features from "@/pages/Features";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Unauthorized from "@/pages/UnAuthorized";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSideBar";
import DashboardLayout from "@/components/layout/DashboardLayout";
import type { TRole } from "@/Types";
import { role } from "@/constant/role";
import { generateRoutes } from "@/utils/generateRoutes";
import { agentSidebar } from "./agentSideBar";
import { userSidebar } from "./userSideBar";
import { withAuth } from "@/utils/withAuth";



export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [

      {
        Component: HomePage,
        index: true
      },
      {
        Component: About,
        path: "/about"
      },
      {
        Component: ContactPage,
        path: "/contact"
      },
      {
        Component: Faq,
        path: "/faq"
      },
      {
        Component: Features,
        path: "/features"
      },

    ],
  },


{
  Component: withAuth(DashboardLayout, role.admin as TRole),
  path: "/admin",
  children:[
  {index: true, element:<Navigate to="/admin/analytics" />},
   ...generateRoutes(adminSidebarItems),
  ]
},
{
  Component: withAuth(DashboardLayout, role.agent as TRole),
  path: "/agent",
  children:[
  {index: true, element:<Navigate to="/agent/stats" />},
  ...generateRoutes(agentSidebar),
  ]
},
{
  Component: withAuth(DashboardLayout, role.user as TRole),
  path: "/user",
  children:[
  {index: true, element:<Navigate to="/user/myStats"/>},
  ...generateRoutes(userSidebar),
  ]
},


  {
    Component: Login,
    path: "/login"
  },
  {
    Component: Register,
    path: "/register"
  },
    {
    Component: Unauthorized,
    path: "/unauthorized",
  },

])