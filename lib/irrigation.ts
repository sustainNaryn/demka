/** Потребность в поливе, л/м²: max(0, ET0 * Kc − осадки) */
export function litersPerSquareMeter(et0: number, kc: number, precipitationMm: number): number {
  const need = et0 * kc - precipitationMm;
  return Math.max(0, need);
}

export type IrrigationVerdict = "water" | "skip";

export function verdict(liters: number): IrrigationVerdict {
  return liters > 0.5 ? "water" : "skip";
}

export type IrrigationDay = {
  date: string;
  label: string;
  litersPerM2: number;
  verdict: IrrigationVerdict;
};

export function buildIrrigationSchedule(
  days: { date: string; label: string; et0: number; precipitation: number }[],
  kc: number,
): IrrigationDay[] {
  return days.map((d) => {
    const litersPerM2 = litersPerSquareMeter(d.et0, kc, d.precipitation);
    return {
      date: d.date,
      label: d.label,
      litersPerM2,
      verdict: verdict(litersPerM2),
    };
  });
}
