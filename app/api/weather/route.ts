import { NextResponse } from "next/server";
import { openMeteoUrl, parseOpenMeteoResponse } from "@/lib/weather";

export async function GET() {
  try {
    const res = await fetch(openMeteoUrl(), {
      next: { revalidate: 1800 },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Open-Meteo: HTTP ${res.status}` },
        { status: 502 },
      );
    }
    const data = await res.json();
    const forecast = parseOpenMeteoResponse(data);
    return NextResponse.json(forecast);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Не удалось загрузить прогноз";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
