import { Card } from "@/components/ui/Card";
import type { IrrigationVerdict } from "@/lib/irrigation";

type Props = {
  litersPerM2: number;
  verdict: IrrigationVerdict;
  et0: number;
  precipitation: number;
  kc: number;
  dateLabel: string;
  greenhouse: boolean;
};

export function TodayCard({
  litersPerM2,
  verdict,
  et0,
  precipitation,
  kc,
  dateLabel,
  greenhouse,
}: Props) {
  const watering = verdict === "water";
  const rain = greenhouse ? 0 : precipitation;

  return (
    <Card title="Сегодня">
      <p className="text-sm capitalize text-solar-forest/60">{dateLabel}</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <p key={litersPerM2.toFixed(2)} className="figure-swap text-5xl font-semibold tabular-nums tracking-tight text-solar-forest">
          {litersPerM2.toFixed(1)}
          <span className="ml-1 text-lg font-medium text-solar-forest/60">л/м²</span>
        </p>
        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            watering
              ? "verdict-live bg-solar-gold text-solar-forest"
              : "bg-solar-leaf/20 text-solar-forest"
          }`}
        >
          {watering ? "Поливать" : "Не нужно"}
        </span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-solar-forest/60">
        {greenhouse
          ? `Теплица: дождь не учитывается, ET₀ × ${kc} × 1.15`
          : `Открытый грунт: ET₀ × ${kc} минус осадки`}
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-2xl bg-solar-cream/70 px-3 py-3">
          <dt className="text-xs text-solar-forest/55">Испарение ET₀</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">{et0.toFixed(1)} мм</dd>
        </div>
        <div className="rounded-2xl bg-sky-50/80 px-3 py-3">
          <dt className="text-xs text-solar-forest/55">{greenhouse ? "Дождь в теплице" : "Осадки"}</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">{rain.toFixed(1)} мм</dd>
        </div>
      </dl>
    </Card>
  );
}
