import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "../store/useAuthStore";
import { MainPage } from "./mainPage";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: MainPage,
});
