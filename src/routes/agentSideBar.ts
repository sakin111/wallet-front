
import AgentCommission from "@/pages/Agent/MyCommission";
import CashIn from "@/pages/Agent/CashIn";
import CashOut from "@/pages/Agent/CashOut";
import type { ISidebarItem } from "@/Types";
import Stats from "@/pages/Agent/Stats";
import { BanknoteArrowDown, BanknoteArrowUp, ChartLine, HandCoins } from "lucide-react";

export const agentSidebar: ISidebarItem[] = [

    {
        title: "Dashboard",
        items: [
            {
                title: "Agent Statistics",
                url: "stats",
                component: Stats,
                icon: ChartLine
            },
            {
                title: "Agent Commission",
                url: "commission",
                component: AgentCommission,
                icon: HandCoins
            },
            {
                title: "Cash IN",
                url: "cash-in",
                component:CashIn,
                icon: BanknoteArrowUp
            },
            {
                title: "Cash Out",
                url: "cash-out",
                component:CashOut,
                icon: BanknoteArrowDown
            },

        ],
    },
];
