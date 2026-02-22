import { createFileRoute } from "@tanstack/react-router";
import RegForm from "../components/RegForm/RegForm";

export const Route = createFileRoute("/regform")({
  component: RegForm,
});
