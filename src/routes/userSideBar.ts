import HomePage from "@/pages/HomePage";
import GuidedTour from "@/pages/User/GuidedTour";
import MyTransaction from "@/pages/User/MyTransaction";
import type { ISidebarItem } from "@/Types";


export const userSidebar: ISidebarItem[] = [
    {
      title: "General",
      items: [
        {
          title: "Home",
          url: "/",         
          component: HomePage, 
          global: true,      
        },
      ],
    },
  {
    title: "user",
    items: [
      { title: "guided tour", url: "guidedTour", component: GuidedTour },
      { title: "My transaction", url: "transaction", component: MyTransaction },
    ],
  },
];
