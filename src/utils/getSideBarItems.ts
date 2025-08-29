import { role } from "@/constant/role";
import { adminSidebarItems } from "@/routes/adminSideBar";
import { agentSidebar } from "@/routes/agentSideBar";
import { userSidebar } from "@/routes/userSideBar";
import type { TRole } from "@/Types";



export const getSidebarItems = (userRole: TRole) => {

    switch (userRole) {
        case role.admin:
            return [...adminSidebarItems]
        case role.agent:
            return [...agentSidebar]
        case role.user:
            return [...userSidebar]
        default:
            return [];
    }
};
