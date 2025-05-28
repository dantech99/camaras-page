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
    url: "/admin/usuarios",
    icon: User,
  },
  {
    name: "Auditorías",
    url: "/admin/auditorias",
    icon: File,
  },
  {
    name: "Metricas",
    url: "/admin/metricas",
    icon: PieChart,
  },
  {
    name: "Ventas",
    url: "/admin/ventas",
    icon: ShoppingCart,
  },
];


const photographer = [
  {
    name: "Perfil",
    url: "/photographer/perfil",
    icon: User,
  },
  {
    name: "Paquetes",
    url: "/photographer/paquetes",
    icon: CameraIcon,
  },
  {
    name: "Cupones",
    url: "/photographer/cupones",
    icon: File,
    
  },
  {
    name: "Horarios",
    url: "/photographer/horarios",
    icon: File,
  },
  {
    name: "Ventas",
    url: "/photographer/ventas",
    icon: ShoppingCart,
  },
];

const endUsers = [
  {
    name: "Mi Perfil",
    url: "/dashboard/perfil",
    icon: User,
  },
  {
    name: "Mis Compras",
    url: "/dashboard/compras",
    icon: ShoppingCart,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();

  const isAdmin = session?.user?.role.includes("admin");
  const isUser = session?.user?.role.includes("user");
  const isPhotographer = session?.user?.role.includes("photographer");

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
        {isAdmin && <NavAdmins projects={administradores} label="Administrador"/>}
        {isPhotographer && <NavAdmins projects={photographer} label="Fotógrafos"/>}
        {isUser && <NavAdmins projects={endUsers} label="Usuarios"/>}
        {
          isPhotographer || isUser ? (
            <NavSecondary items={data.navSecondary} className="mt-auto" />
          ) : null
        }
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
