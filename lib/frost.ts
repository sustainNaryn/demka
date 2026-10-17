export const FROST_TIP =
  "Укройте грядки агроволокном или плёнкой на ночь, полейте почву днём — влажная земля лучше держит тепло.";

export type FrostDay = {
  date: string;
  label: string;
  tempMin: number;
};

export function frostDays(
  days: { date: string; label: string; tempMin: number }[],
): FrostDay[] {
  return days
    .filter((d) => d.tempMin <= 0)
    .map((d) => ({ date: d.date, label: d.label, tempMin: d.tempMin }));
}

export function isFrost(tempMin: number): boolean {
  return tempMin <= 0;
}
