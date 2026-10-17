export type DailyWeather = {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  et0_fao_evapotranspiration: number[];
};

export type WeatherForecast = {
  daily: DailyWeather;
  timezone: string;
};

const NARYN = { lat: 41.43, lon: 75.99 };

export function openMeteoUrl(): string {
  const params = new URLSearchParams({
    latitude: String(NARYN.lat),
    longitude: String(NARYN.lon),
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "et0_fao_evapotranspiration",
    ].join(","),
    timezone: "Asia/Bishkek",
    forecast_days: "7",
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

export function parseOpenMeteoResponse(data: unknown): WeatherForecast {
  if (!data || typeof data !== "object") {
    throw new Error("Некорректный ответ API");
  }
  const raw = data as Record<string, unknown>;
  const daily = raw.daily as Record<string, unknown> | undefined;
  if (!daily || !Array.isArray(daily.time)) {
    throw new Error("В ответе нет daily-прогноза");
  }

  const requireNumbers = (key: keyof DailyWeather, label: string): number[] => {
    const arr = daily[key as string];
    if (!Array.isArray(arr)) throw new Error(`Нет поля ${label}`);
    return arr.map((v) => (typeof v === "number" ? v : Number(v)));
  };

  return {
    timezone: typeof raw.timezone === "string" ? raw.timezone : "Asia/Bishkek",
    daily: {
      time: daily.time as string[],
      temperature_2m_max: requireNumbers("temperature_2m_max", "temperature_2m_max"),
      temperature_2m_min: requireNumbers("temperature_2m_min", "temperature_2m_min"),
      precipitation_sum: requireNumbers("precipitation_sum", "precipitation_sum"),
      et0_fao_evapotranspiration: requireNumbers(
        "et0_fao_evapotranspiration",
        "et0_fao_evapotranspiration",
      ),
    },
  };
}

export type DayForecast = {
  date: string;
  label: string;
  tempMax: number;
  tempMin: number;
  precipitation: number;
  et0: number;
};

export function toDayForecasts(forecast: WeatherForecast): DayForecast[] {
  const { daily } = forecast;
  return daily.time.map((date, i) => ({
    date,
    label: formatDayLabel(date),
    tempMax: daily.temperature_2m_max[i] ?? 0,
    tempMin: daily.temperature_2m_min[i] ?? 0,
    precipitation: daily.precipitation_sum[i] ?? 0,
    et0: daily.et0_fao_evapotranspiration[i] ?? 0,
  }));
}

function formatDayLabel(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00`);
  return d.toLocaleDateString("ru-RU", { weekday: "short", day: "numeric", month: "short" });
}
