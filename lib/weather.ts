export type DailyWeather = {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  et0_fao_evapotranspiration: number[];
};

export type WeatherSource = {
  basis: "historical-average";
  years: number[];
};

export type WeatherForecast = {
  daily: DailyWeather;
  timezone: string;
  source: WeatherSource;
};

const NARYN = { lat: 41.43, lon: 75.99 };
const TIMEZONE = "Asia/Bishkek";
const DAILY_FIELDS = [
  "temperature_2m_max",
  "temperature_2m_min",
  "precipitation_sum",
  "et0_fao_evapotranspiration",
] as const;

export const HISTORY_YEAR_COUNT = 5;
export const FORECAST_DAYS = 7;

export function calendarDateInTimeZone(timeZone: string, now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function addCalendarDays(iso: string, days: number): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function historicalDates(dates: string[], year: number): string[] {
  const originYear = Number(dates[0]?.slice(0, 4));
  const shift = year - originYear;
  return dates.map((date) => {
    const [dateYear, month, day] = date.split("-").map(Number);
    const shifted = new Date(Date.UTC(dateYear + shift, month - 1, day));
    return shifted.toISOString().slice(0, 10);
  });
}

export function upcomingDates(today = calendarDateInTimeZone(TIMEZONE)): string[] {
  return Array.from({ length: FORECAST_DAYS }, (_, i) => addCalendarDays(today, i));
}

export function historyYears(today = calendarDateInTimeZone(TIMEZONE)): number[] {
  const year = Number(today.slice(0, 4));
  return Array.from({ length: HISTORY_YEAR_COUNT }, (_, i) => year - HISTORY_YEAR_COUNT + i);
}

export function archiveUrl(startDate: string, endDate: string): string {
  const params = new URLSearchParams({
    latitude: String(NARYN.lat),
    longitude: String(NARYN.lon),
    start_date: startDate,
    end_date: endDate,
    daily: DAILY_FIELDS.join(","),
    timezone: TIMEZONE,
  });
  return `https://archive-api.open-meteo.com/v1/archive?${params.toString()}`;
}

function mean(values: number[]): number {
  const finite = values.filter((value) => Number.isFinite(value));
  if (finite.length === 0) return Number.NaN;
  const avg = finite.reduce((sum, value) => sum + value, 0) / finite.length;
  return Math.round(avg * 100) / 100;
}

export function averageHistorical(
  samples: { year: number; daily: DailyWeather }[],
  targetDates: string[],
): WeatherForecast {
  if (samples.length === 0) {
    throw new Error("Архив не вернул ни одного года");
  }

  const series = targetDates.map((date) => {
    const monthDay = date.slice(5);
    const rows = samples.flatMap((sample) => {
      const index = sample.daily.time.findIndex((day) => day.slice(5) === monthDay);
      if (index < 0) return [];
      return [
        {
          tempMax: sample.daily.temperature_2m_max[index],
          tempMin: sample.daily.temperature_2m_min[index],
          precipitation: sample.daily.precipitation_sum[index],
          et0: sample.daily.et0_fao_evapotranspiration[index],
        },
      ];
    });
    return {
      tempMax: mean(rows.map((row) => row.tempMax)),
      tempMin: mean(rows.map((row) => row.tempMin)),
      precipitation: mean(rows.map((row) => row.precipitation)),
      et0: mean(rows.map((row) => row.et0)),
    };
  });

  if (series.some((day) => !Number.isFinite(day.et0) || !Number.isFinite(day.tempMin))) {
    throw new Error("В архиве не хватает данных за выбранные даты");
  }

  return {
    timezone: TIMEZONE,
    source: {
      basis: "historical-average",
      years: samples.map((sample) => sample.year).sort((a, b) => a - b),
    },
    daily: {
      time: targetDates,
      temperature_2m_max: series.map((day) => day.tempMax),
      temperature_2m_min: series.map((day) => day.tempMin),
      precipitation_sum: series.map((day) => day.precipitation),
      et0_fao_evapotranspiration: series.map((day) => day.et0),
    },
  };
}

export function parseOpenMeteoResponse(
  data: unknown,
): Pick<WeatherForecast, "timezone" | "daily"> {
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
    return arr.map((v) => (typeof v === "number" ? v : v == null ? Number.NaN : Number(v)));
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
