import { createFileRoute } from "@tanstack/react-router";
import KanbanMain from "../components/kanban/KanbanMain";

export const Route = createFileRoute("/newclear")({
  component: KanbanMain,
});
