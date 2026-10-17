import { Card } from "@/components/ui/Card";
import { FROST_TIP, type FrostDay } from "@/lib/frost";

type Props = {
  days: FrostDay[];
};

export function FrostAlert({ days }: Props) {
  if (days.length === 0) {
    return (
      <Card title="Заморозки">
        <p className="text-lg font-medium text-solar-forest">Ночи тёплые</p>
        <p className="mt-2 text-sm leading-relaxed text-solar-forest/75">
          В ближайшие 7 дней минимум держится выше 0 °C. Укрывать грядки не нужно.
        </p>
      </Card>
    );
  }

  const coldest = days.reduce((min, d) => (d.tempMin < min.tempMin ? d : min), days[0]);

  return (
    <Card title="Предупреждение о заморозках" className="ring-1 ring-sky-200/80">
      <p className="text-lg font-medium text-solar-forest">
        {days.length}{" "}
        {days.length === 1 ? "холодная ночь" : days.length < 5 ? "холодные ночи" : "холодных ночей"}
      </p>
      <p className="mt-1 text-sm text-solar-forest/75">
        Самый низкий минимум — {coldest.tempMin.toFixed(1)} °C, {coldest.label}.
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {days.map((d) => (
          <li
            key={d.date}
            className="rounded-full bg-sky-100/90 px-3 py-1 text-xs font-medium text-solar-sky-deep"
          >
            ❄ {d.label} · {d.tempMin.toFixed(1)} °C
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-2xl bg-white/60 px-3 py-3 text-sm leading-relaxed text-solar-forest/80">
        {FROST_TIP}
      </p>
    </Card>
  );
}
