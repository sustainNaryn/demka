import { NextResponse } from "next/server";
import {
  archiveUrl,
  averageHistorical,
  historicalDates,
  historyYears,
  parseOpenMeteoResponse,
  upcomingDates,
} from "@/lib/weather";

export const revalidate = 86_400;

export async function GET() {
  try {
    const dates = upcomingDates();
    const years = historyYears();
    const settled = await Promise.all(
      years.map(async (year) => {
        const shifted = historicalDates(dates, year);
        const res = await fetch(archiveUrl(shifted[0], shifted[shifted.length - 1]), {
          next: { revalidate: 86_400 },
        });
        if (!res.ok) {
          throw new Error(`Open-Meteo ${year}: HTTP ${res.status}`);
        }
        const forecast = parseOpenMeteoResponse(await res.json());
        return { year, daily: forecast.daily };
      }),
    );

    const forecast = averageHistorical(settled, dates);
    return NextResponse.json(forecast);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Не удалось собрать прогноз по архиву";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
