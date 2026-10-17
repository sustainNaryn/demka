import { type ReactNode } from "react";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh max-w-6xl px-4 py-6 pb-10 sm:px-6 sm:py-8">
      <header className="mb-6 sm:mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-solar-sky-deep">
          SolarPunk · Бишкек
        </p>
        <h1 className="mt-1 text-2xl font-bold text-solar-forest sm:text-3xl">Умный полив</h1>
        <p className="mt-2 max-w-xl text-sm text-solar-forest/75">
          Рекомендации по поливу на 7 дней по ET₀, осадкам и выбранной культуре.
        </p>
      </header>
      {children}
    </div>
  );
}
