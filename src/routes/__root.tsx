import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Sidebar } from "../components/sideBar/SideBar";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen bg-[#0d0d0d]">
      <Sidebar />
      <main className="flex-1 ml-14">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
});