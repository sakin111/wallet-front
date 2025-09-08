import type { ISidebarItem } from "@/Types";


export const generateRoutes = (sideBarItems: ISidebarItem[]) => {
  return sideBarItems.flatMap(section =>
    section.items
      .map(route => ({
        path: route.url,
        Component: route.component,
      }))
  );
};
