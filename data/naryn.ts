/** Климат и традиционный полив Нарына. Высота архива Open-Meteo для этой точки — около 2045 м. */
export const naryn = {
  elevationM: 2050,
  climate: "Холодный полузасушливый",
  winterNightC: -20,
  summerDayC: 25,
  annualPrecipMm: "250–400",
  rainPeak: "май–июнь",
  /** Пиковый традиционный полив, л/га в сутки. 60 000 л/га = 6 л/м². */
  traditionalPeakLitersPerHa: 60_000,
  /** Ориентир экономии умного полива по исследованиям ирригации, не расчёт этой недели. */
  smartSavingsPercent: "30–50",
} as const;
