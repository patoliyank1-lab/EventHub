"use client";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export function AppSidebar() {
  const { logout, isLogin } = useContext(AuthContext);
  const router = useRouter();

  const onclick = (url: string) => {
    router.push(url);
  };

  const onLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    { title: "Events", url: "/" },
    { title: "Create Event", url: "/create" },
    { title: "Profile", url: "/profile" },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold py-6 px-4">EventHub</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => onclick(item.url)} className="py-2">
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {isLogin && (
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={onLogout} className="text-red-500 py-2">
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
