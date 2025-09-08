import Deposit from "@/pages/User/Deposit";
import MyStats from "@/pages/User/MyStats";
import { Profile } from "@/pages/User/Profile";



import SendMoney from "@/pages/User/SendMoney";
import Withdraw from "@/pages/User/Withdraw";
import type { ISidebarItem } from "@/Types";

export const userSidebar: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "MyStats",
        url: "/user/myStats",
        component: MyStats ,
      },
      {
        title: "deposit",
        url: "/user/deposit",
        component: Deposit,
      },
      {
        title: "withdraw",
        url: "/user/withdraw",
        component: Withdraw,
      },
      {
        title: "sendMoney",
        url: "/user/sendMoney",
        component: SendMoney,
      },
      {
        title: "profile",
        url: "/user/profile",
        component: Profile,
      },
 
    ],
  },
];

