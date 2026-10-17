import { greenhouseMultiplier } from "@/data/greenhouse";
import { isFrost } from "@/lib/frost";

export type IrrigationOptions = {
  greenhouse: boolean;
};

/** Потребность в поливе, л/м²: max(0, ET0 * Kc * множитель − осадки) */
export function litersPerSquareMeter(
  et0: number,
  kc: number,
  precipitationMm: number,
  options: IrrigationOptions,
): number {
  const multiplier = options.greenhouse ? greenhouseMultiplier : 1;
  const rain = options.greenhouse ? 0 : precipitationMm;
  return Math.max(0, et0 * kc * multiplier - rain);
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
  frost: boolean;
  tempMin: number;
};

export function buildIrrigationSchedule(
  days: {
    date: string;
    label: string;
    et0: number;
    precipitation: number;
    tempMin: number;
  }[],
  kc: number,
  options: IrrigationOptions,
): IrrigationDay[] {
  return days.map((d) => {
    const litersPerM2 = litersPerSquareMeter(d.et0, kc, d.precipitation, options);
    return {
      date: d.date,
      label: d.label,
      litersPerM2,
      verdict: verdict(litersPerM2),
      frost: isFrost(d.tempMin),
      tempMin: d.tempMin,
    };
  });
}
