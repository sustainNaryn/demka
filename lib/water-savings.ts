/** Фиксированная норма «поливать каждый день», л/м² */
export const FIXED_DAILY_LITERS_PER_M2 = 6;

export type WaterSavings = {
  baselineLiters: number;
  smartLiters: number;
  savedLiters: number;
  days: number;
};

export function waterSaved(dailyNeeds: number[]): WaterSavings {
  const days = dailyNeeds.length;
  const baselineLiters = FIXED_DAILY_LITERS_PER_M2 * days;
  const smartLiters = dailyNeeds.reduce((sum, n) => sum + n, 0);
  return {
    baselineLiters,
    smartLiters,
    savedLiters: Math.max(0, baselineLiters - smartLiters),
    days,
  };
}
