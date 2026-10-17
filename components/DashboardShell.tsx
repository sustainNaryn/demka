import { type ReactNode } from "react";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh">
      <div className="sun-orb" aria-hidden />
      <div className="glow-orb" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-6 pb-12 sm:px-6 sm:py-10">
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-solar-sky-deep shadow-sm">
              <span className="h-2 w-2 rounded-full bg-solar-gold shadow-[0_0_0_4px_rgb(255_209_102_/_0.35)]" />
              SolarPunk · Нарын
            </span>
            <span className="rounded-full bg-solar-forest/8 px-3 py-1 text-xs text-solar-forest/80">
              Архив 5 лет · Open-Meteo
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-solar-forest sm:text-4xl">
            Умный полив
            <span className="mt-1 block text-xl font-medium text-solar-gold-deep sm:text-2xl">
              для грядок Нарына
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-solar-forest/75 sm:text-base">
            Норма полива считается по средним температуре, осадкам и ET₀ за те же 7 дат
            предыдущих лет.
          </p>
        </header>
        {children}
      </div>
    </div>
  );
}
