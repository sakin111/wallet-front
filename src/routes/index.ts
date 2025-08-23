import App from "@/App";
import About from "@/components/module/about/About";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
      {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },

    ],
  },
])