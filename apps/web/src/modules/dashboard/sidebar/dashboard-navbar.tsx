"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@camaras/ui/src/components/breadcrumb";

import { SidebarTrigger } from "@camaras/ui/src/components/sidebar";
import { Separator } from "@camaras/ui/src/components/separator";
import { usePathname } from "next/navigation";
import React from "react";

export function DashboardNavbar() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      isCurrentPage: segments.length === 1
    }
  ];

  if (segments.length > 1) {
    let currentPath = '/dashboard';
    segments.slice(1).forEach((segment, index) => {
      currentPath += `/${segment}`;
      breadcrumbs.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: currentPath,
        isCurrentPage: index === segments.length - 2
      });
    });
  }

  return (
    <header className="flex shrink-0 items-center gap-2 p-2">
      <div className="flex items-center gap-2 px-1">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                <BreadcrumbItem className="hidden md:block">
                  {crumb.isCurrentPage ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
