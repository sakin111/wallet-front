
import AgentCommission from "@/pages/Agent/MyCommission";
import CashIn from "@/pages/Agent/CashIn";
import CashOut from "@/pages/Agent/CashOut";
import type { ISidebarItem } from "@/Types";
import Stats from "@/pages/Agent/Stats";

export const agentSidebar: ISidebarItem[] = [

    {
        title: "Dashboard",
        items: [
            {
                title: "Agent Statistics",
                url: "stats",
                component: Stats,
            },
            {
                title: "Agent Commission",
                url: "commission",
                component: AgentCommission,
            },
            {
                title: "Cash IN",
                url: "cash-in",
                component:CashIn,
            },
            {
                title: "Cash Out",
                url: "cash-out",
                component:CashOut,
            },

        ],
    },
];
