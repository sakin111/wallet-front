import { AdminProfile } from "@/pages/Admin/AdminProfile";
import AllCommission from "@/pages/Admin/AllCommission";
import AllTransaction from "@/pages/Admin/AllTransaction";
import AllUsers from "@/pages/Admin/AllUsers";
import Analytics from "@/pages/Admin/Analytics";
import ManageAgent from "@/pages/Admin/ManageAgent";
import type { ISidebarItem } from "@/Types";
import { ChartLine, CircleDollarSign, CircleUser, HandCoins, SlidersHorizontal, UsersRound } from "lucide-react";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
        icon: ChartLine
      },
      {
        title: "Admin Profile",
        url: "/admin/adminProfile",
        component: AdminProfile,
        icon: CircleUser
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
        icon: UsersRound
        
      },
      {
        title: "All Transactions",
        url: "allTransactions",
        component: AllTransaction,
        icon: CircleDollarSign
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
        icon: HandCoins
      },
      {
        title: "Manage Agents",
        url: "manageAgents",
        component: ManageAgent,
        icon: SlidersHorizontal
      },
    ],
  },
];
