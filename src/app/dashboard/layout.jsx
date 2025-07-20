import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({ children }) => {
  const session = await auth();
  const user = await currentUser();

  if (!session) redirect("/auth/login");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar user={user} />
        <main className="flex-1 h-screen overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
