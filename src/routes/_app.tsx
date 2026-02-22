import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { Sidebar } from "../components/sideBar/SideBar";
import { useAuthStore } from "../store/useAuthStore";

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      throw redirect({ to: "/regform" });
    }
  },
  component: () => (
    <div className="flex min-h-screen bg-[#0d0d0d]">
      <Sidebar />
      <main className="flex-1 ml-14">
        <Outlet />
      </main>
    </div>
  ),
});
