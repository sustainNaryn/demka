export type SoilReading = {
  hour: string;
  moisture: number;
};

/** Детерминированные «демо»-данные влажности за последние 24 часа */
export function generateSoilMoisture24h(now = new Date()): SoilReading[] {
  const points: SoilReading[] = [];
  for (let i = 23; i >= 0; i--) {
    const t = new Date(now);
    t.setHours(t.getHours() - i, 0, 0, 0);
    const hour = t.getHours();
    const sun = Math.max(0, Math.sin(((hour - 6) / 12) * Math.PI));
    const base = 42 - sun * 14;
    const wobble = Math.sin(i * 0.7) * 3 + Math.cos(i * 0.31) * 2;
    const moisture = Math.round(Math.min(78, Math.max(22, base + wobble)) * 10) / 10;
    points.push({
      hour: t.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      moisture,
    });
  }
  return points;
}

/** Заряд солнечной панели датчика, % (демо) */
export function demoSolarChargePercent(now = new Date()): number {
  const hour = now.getHours() + now.getMinutes() / 60;
  const daylight = Math.max(0, Math.sin(((hour - 5) / 14) * Math.PI));
  const charge = 35 + daylight * 62 + Math.sin(hour) * 2;
  return Math.round(Math.min(100, Math.max(18, charge)));
}
