"use client";

import * as React from "react";
import {
  BookOpen,
  Calendar1Icon,
  CameraIcon,
  Command,
  File,
  Home,
  LifeBuoy,
  PieChart,
  Send,
  ShoppingCart,
  TicketIcon,
  User,
} from "lucide-react";
import { IconInnerShadowTop } from "@tabler/icons-react"

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
    name: "Inicio",
    url: "/admin",
    icon: Home,
  },
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
    name: "Inicio",
    url: "/photographer",
    icon: Home,
  },
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
    icon: TicketIcon,
    
  },
  {
    name: "Horarios",
    url: "/photographer/horarios",
    icon: Calendar1Icon,
  },
  {
    name: "Ventas",
    url: "/photographer/ventas",
    icon: ShoppingCart,
  },
];

const endUsers = [
  {
    name: "Inicio",
    url: "/dashboard",
    icon: Home,
  },
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
          <SidebarMenuItem className="flex items-center gap-2 font-semibold">
            <IconInnerShadowTop size={20} />
            Dashboard
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {isAdmin && <NavAdmins projects={administradores} />}
        {isPhotographer && <NavAdmins projects={photographer} />}
        {isUser && <NavAdmins projects={endUsers} />}
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
