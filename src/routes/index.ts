import App from "@/App";
import About from "@/pages/About";
import ContactPage from "@/pages/ContactPage";
import Faq from "@/pages/Faq";
import Features from "@/pages/Features";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";


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
    Component: Login,
    path: "/login"
  },
  {
    Component: Register,
    path: "/register"
  }

])