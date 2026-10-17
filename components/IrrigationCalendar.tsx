import { Card } from "@/components/ui/Card";
import type { IrrigationDay } from "@/lib/irrigation";

type Props = {
  days: IrrigationDay[];
};

export function IrrigationCalendar({ days }: Props) {
  return (
    <Card title="Календарь полива">
      <ul className="space-y-2">
        {days.map((d, i) => (
          <li
            key={d.date}
            className={`flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 transition-colors ${
              d.frost ? "bg-sky-50/90" : "bg-white/55 hover:bg-white/80"
            }`}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div>
              <p className="text-sm font-medium capitalize text-solar-forest">
                {d.frost ? <span aria-label="заморозок">❄ </span> : null}
                {d.label}
              </p>
              <p className="text-xs tabular-nums text-solar-forest/60">
                {d.litersPerM2.toFixed(1)} л/м²
                {d.frost ? ` · мин. ${d.tempMin.toFixed(1)} °C` : ""}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                d.verdict === "water"
                  ? "bg-solar-gold text-solar-forest"
                  : "bg-solar-moss/50 text-solar-forest"
              }`}
            >
              {d.verdict === "water" ? "Полив" : "Пропуск"}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
