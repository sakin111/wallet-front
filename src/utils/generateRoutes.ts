import type { ISidebarItem } from "@/Types";

export const generateRoutes = (sideBarItems: ISidebarItem[]) => {
  return sideBarItems.flatMap((section) =>
    section.items
      .filter((route) => route.url && !route.url.startsWith("/")) 
      .map((route) => ({
        path: route.url,
        Component: route.component,
      }))
  );
};
