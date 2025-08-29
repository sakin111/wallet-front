import AllCommission from "@/pages/Admin/AllCommission";
import AllTransaction from "@/pages/Admin/AllTransaction";
import AllUsers from "@/pages/Admin/AllUsers";
import Analytics from "@/pages/Admin/Analytics";
import HomePage from "@/pages/HomePage";
import type { ISidebarItem } from "@/Types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
    {
        title: "General",
        items: [
            {
                title: "Home",
                url: "/",
                component: HomePage,
            },
        ],
    },
  {
    title: "Users",
    items: [
      {
        title: "All Users",
        url: "all-users",
        component: AllUsers,
      },
      {
        title: "All Transactions",
        url: "all-transactions",
        component: AllTransaction,
      },
    ],
  },
  {
    title: "Agents",
    items: [
      {
        title: "All Commissions",
        url: "all-commissions",
        component: AllCommission,
      },
    ],
  },
];
