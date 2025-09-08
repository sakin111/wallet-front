import AllCommission from "@/pages/Admin/AllCommission";
import AllTransaction from "@/pages/Admin/AllTransaction";
import AllUsers from "@/pages/Admin/AllUsers";
import Analytics from "@/pages/Admin/Analytics";
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
    title: "Users",
    items: [
      {
        title: "All Users",
        url: "allUsers",
        component: AllUsers,
      },
      {
        title: "All Transactions",
        url: "allTransactions",
        component: AllTransaction,
      },
    ],
  },
  {
    title: "Agents",
    items: [
      {
        title: "All Commissions",
        url: "allCommissions",
        component: AllCommission,
      },
    ],
  },
];
