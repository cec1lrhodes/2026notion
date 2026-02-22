import { createFileRoute } from "@tanstack/react-router";
import KanbanMain from "../components/kanban/KanbanMain";

export const Route = createFileRoute("/kanban")({
  component: KanbanMain,
});
