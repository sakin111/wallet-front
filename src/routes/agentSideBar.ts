import AgentCommission from "@/pages/Agent/AgentCommission";
import HomePage from "@/pages/HomePage";
import type { ISidebarItem } from "@/Types";

export const agentSidebar: ISidebarItem[] = [

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
        title: "Commission",
        items: [
            {
                title: "Agent Commission",
                url: "commission",
                component: AgentCommission,
            },

        ],
    },
];
