/**
 * Пиковый традиционный полив: 60 000 л/га в сутки = 6 л/м².
 * Вне пика сезона эта норма завышена.
 */
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
