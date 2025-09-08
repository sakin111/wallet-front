import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Tour from "../tour";
import type { Step } from "react-joyride";

export default function DashboardLayout() {


  const [showTour, setShowTour] = useState(false);

  const steps: Step[] = [
    {
      target: ".nav-menu",
      content: "Use this navigation menu to switch between sections.",
    },
    {
      target: ".stats-cards",
      content: "Quick overview of your key stats at a glance.",
    },
    {
      target: ".chart-section",
      content: "Visualize trends and insights in this chart area.",
    },
    {
      target: ".table-filter",
      content: "Search and filter records quickly in this table.",
    },
    {
      target: ".theme-toggle",
      content: "Switch between Light and Dark mode here.",
    },
  ];


  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (!hasSeenTour) {
      setShowTour(true);
    }
  }, []);

  const handleFinishTour = () => {
    localStorage.setItem("hasSeenTour", "true");
    setShowTour(false);
  };




  return (
    <SidebarProvider>
          {showTour && (
        <Tour steps={steps} runTour={showTour} onFinish={handleFinishTour} />
      )}
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        </header>

 
        <Outlet />

        {/* Optional fallback UI if no child route matches */}
        {/* <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
