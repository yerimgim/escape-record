import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div className="flex flex-col gap-2">
      <main>메인페이지</main>
    </div>
  );
}
