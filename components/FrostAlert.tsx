import { Card } from "@/components/ui/Card";
import { FROST_TIP, type FrostDay } from "@/lib/frost";

type Props = {
  days: FrostDay[];
};

export function FrostAlert({ days }: Props) {
  if (days.length === 0) {
    return (
      <Card title="Заморозки">
        <p className="text-sm text-solar-forest/80">
          В ближайшие 7 дней ночная температура выше 0 °C.
        </p>
      </Card>
    );
  }

  const coldest = days.reduce((min, d) => (d.tempMin < min.tempMin ? d : min), days[0]);

  return (
    <Card title="Предупреждение о заморозках">
      <p className="text-sm font-medium text-solar-forest">
        Ожидается {days.length}{" "}
        {days.length === 1 ? "день" : days.length < 5 ? "дня" : "дней"} с минимумом ≤ 0 °C.
        Самый холодный: {coldest.label}, {coldest.tempMin.toFixed(1)} °C.
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {days.map((d) => (
          <li
            key={d.date}
            className="rounded-lg bg-sky-100/80 px-2.5 py-1 text-xs font-medium text-solar-sky-deep"
          >
            ❄ {d.label} · {d.tempMin.toFixed(1)} °C
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-solar-forest/80">{FROST_TIP}</p>
    </Card>
  );
}
