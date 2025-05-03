"use client";

import * as React from "react";
import {
  BookOpen,
  CameraIcon,
  Command,
  File,
  LifeBuoy,
  PieChart,
  Send,
  ShoppingCart,
  User,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavAdmins } from "./nav-projects";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@camaras/ui/src/components/sidebar";
import { useProfile } from "@/hooks/use-profile";
import { authClient } from "@camaras/auth/client";

const data = {
  navMain: [
    {
      title: "General",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Metricas",
          url: "/dashboard",
        },
        {
          title: "Perfil",
          url: "/dashboard/perfil",
        },
      ],
    },
    {
      title: "Fotografo",
      url: "#",
      icon: CameraIcon,
      items: [
        {
          title: "Paquetes",
          url: "/dashboard/paquetes",
        },
        {
          title: "Cupones",
          url: "/dashboard/cupones",
        },
        {
          title: "Horarios",
          url: "/dashboard/horarios",
        },
        {
          title: "Ventas",
          url: "/dashboard/ventas",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Soporte",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

const administradores = [
  {
    name: "Usuarios",
    url: "/dashboard/usuarios",
    icon: User,
  },
  {
    name: "Auditorías",
    url: "/dashboard/auditorias",
    icon: File,
  },
  {
    name: "Metricas",
    url: "/dashboard/all-metrics",
    icon: PieChart,
  },
  {
    name: "Ventas",
    url: "/dashboard/ventas",
    icon: ShoppingCart,
  },
];


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: session } = authClient.useSession();

  const isAdmin = session?.user?.role === "admin";

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary-blue text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Las Cámaras del Dragón
                  </span>
                  <span className="truncate text-xs">Panel Administrativo</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <NavMain items={data.navMain} />
        <NavAdmins projects={administradores} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
