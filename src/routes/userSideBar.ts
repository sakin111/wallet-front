import Deposit from "@/pages/User/Deposit";
import MyStats from "@/pages/User/MyStats";
import { Profile } from "@/pages/User/Profile";



import SendMoney from "@/pages/User/SendMoney";
import Withdraw from "@/pages/User/Withdraw";
import type { ISidebarItem } from "@/Types";
import { BanknoteArrowDown, ChartLine, CircleUser, PiggyBank, SendIcon } from "lucide-react";

export const userSidebar: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "MyStats",
        url: "/user/myStats",
        component: MyStats ,
        icon: ChartLine
      },
      {
        title: "deposit",
        url: "/user/deposit",
        component: Deposit,
        icon: PiggyBank
      },
      {
        title: "withdraw",
        url: "/user/withdraw",
        component: Withdraw,
        icon: BanknoteArrowDown
      },
      {
        title: "sendMoney",
        url: "/user/sendMoney",
        component: SendMoney,
        icon: SendIcon
      },
      {
        title: "profile",
        url: "/user/profile",
        component: Profile,
        icon: CircleUser
      },
 
    ],
  },
];

