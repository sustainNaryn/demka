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

  return (
    <Card title="Сегодня">
      <p className="text-xs text-solar-forest/60">{dateLabel}</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-bold tabular-nums text-solar-forest">
            {litersPerM2.toFixed(1)}
            <span className="ml-1 text-lg font-semibold text-solar-forest/70">л/м²</span>
          </p>
          <p className="mt-1 text-xs text-solar-forest/65">
            {greenhouse
              ? `max(0, ET₀×Kc×коэф. теплицы) · Kc = ${kc}`
              : `max(0, ET₀×Kc − осадки) · Kc = ${kc}`}
          </p>
        </div>
        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            watering
              ? "bg-solar-gold/90 text-solar-forest shadow-sm"
              : "bg-solar-leaf/25 text-solar-forest"
          }`}
        >
          {watering ? "Поливать" : "Не нужно"}
        </span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg bg-white/50 px-3 py-2">
          <dt className="text-xs text-solar-forest/60">ET₀</dt>
          <dd className="font-medium tabular-nums">{et0.toFixed(1)} мм</dd>
        </div>
        <div className="rounded-lg bg-white/50 px-3 py-2">
          <dt className="text-xs text-solar-forest/60">
            {greenhouse ? "Осадки (теплица)" : "Осадки"}
          </dt>
          <dd className="font-medium tabular-nums">
            {greenhouse ? "0.0" : precipitation.toFixed(1)} мм
          </dd>
        </div>
      </dl>
    </Card>
  );
}
