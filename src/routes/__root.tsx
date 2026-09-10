import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <main className="w-full max-w-107.5 h-dvh sm:h-220 sm:rounded-[32px] bg-white shadow-2xl flex flex-col relative overflow-hidden">
        <header className="p-4 flex items-center justify-between">
          <nav>
            <Link to="/" className="font-black text-slate-900">
              방탈출 기록
            </Link>
          </nav>
        </header>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}
