"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ user, ...props }) {
  // Base admin items
  const adminItems = [
    {
      title: "Create Quiz",
      url: "/dashboard/admin/quizzes/create",
    },
    {
      title: "All Quizzes",
      url: "/dashboard/admin/quizzes",
    },
    {
      title: "Create Test",
      url: "/dashboard/admin/tests/create",
    },
    {
      title: "All Test",
      url: "/dashboard/admin/tests",
    },
  ];

  // If user role is USER, only show My Test
  const userItems =
    user?.role === "USER"
      ? [
          {
            title: "My Test",
            url: "/dashboard/user",
          },
        ]
      : adminItems;

  return (
    <Sidebar collapsible="icon" {...props}>
      <h2 className="text-3xl mt-2 ml-5">Exponent</h2>
      <SidebarContent>
        <NavMain items={userItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
