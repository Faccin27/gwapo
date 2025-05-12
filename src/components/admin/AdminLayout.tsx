'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Settings,
  FolderKanban,
  ArrowLeft,
  LayoutTemplate,
  ChartArea
} from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground dark">
        <div className="fixed top-0 left-0 h-screen z-30">
          <Sidebar
            className="border-r border-border h-screen bg-background dark rounded-r-lg"
            variant="sidebar"
            collapsible="offcanvas"
          >
            <SidebarHeader className="flex p-2">
              <Link href="/admin" className="flex items-center gap-1">
                <img
                  src="/images/logo.png"
                  alt="GWAPO Logo"
                  className="h-14 w-14"
                />
                <h2 className="text-xl font-bold text-foreground">
                  GW<span className="text-gwapo">APO</span>
                </h2>
              </Link>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="text-muted-foreground">
                  Admin
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin">
                          <ChartArea className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/seo">
                          <Settings className="h-4 w-4" />
                          <span>SEO Settings</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/projects">
                          <FolderKanban className="h-4 w-4" />
                          <span>Projects</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/ready-made-sites">
                          <LayoutTemplate className="h-4 w-4" />
                          <span>Ready Made Sites</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-border p-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Website
              </Link>
            </SidebarFooter>
          </Sidebar>
        </div>

        <div className="flex-1 ml-[16rem]">
          <div className="px-12 py-6">
            <SidebarTrigger />
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
