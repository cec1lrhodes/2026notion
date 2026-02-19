import { createFileRoute } from "@tanstack/react-router";
import Kanban from "../components/kanban/Kanban";

export const Route = createFileRoute("/newclear")({
  component: Kanban,
});
