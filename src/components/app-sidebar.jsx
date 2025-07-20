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
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { url } from "zod";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
  title: "Quizzes",
  url: "/admin/quizzes/create",
  icon: BookOpen,
  items: [
    {
      title: "Create Quiz",
      url: "/dashboard/admin/quizzes/create",
    },
    {
      title: "All Quizzes",
      url: "/dashboard/admin/quizzes",
    },
    {
      title:"Create Test",
      url:"/dashboard/admin/tests/create"
    },
    {
      title:"All Test",
      url:"/dashboard/admin/tests"
    }
  ],
},
  ],
};

export function AppSidebar({ user, ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <h2 className="text-3xl mt-2 ml-5">Exponent</h2>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
