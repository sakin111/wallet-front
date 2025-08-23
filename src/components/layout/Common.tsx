import type { ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";


interface IProps {
  children: ReactNode;
}

export default function Common({children} : IProps) {
  return (
    <div className="min-h-screen flex flex-col">
        <NavBar/>
        <div className="grow-1">{children}</div>
        <Footer/>
      
    </div>
  )
}