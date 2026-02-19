import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/newclear")({
  component: () => (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
      <h1 className="text-white text-3xl font-light tracking-[0.2em]">NewClear</h1>
    </div>
  ),
});