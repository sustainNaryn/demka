"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import type { DayForecast } from "@/lib/weather";

type Props = {
  days: DayForecast[];
  years: number[];
};

export function WeatherChart({ days, years }: Props) {
  const data = days.map((d) => ({
    name: d.label,
    precip: d.precipitation,
    temp: (d.tempMax + d.tempMin) / 2,
    et0: d.et0,
  }));

  return (
    <Card title="Прогноз по архиву · 7 дней" className="min-h-[280px]">
      <p className="mb-3 text-xs text-solar-forest/60">
        {years.length > 0
          ? `Среднее за ${years[0]}–${years[years.length - 1]}, те же календарные даты`
          : "Среднее за те же календарные даты прошлых лет"}
      </p>
      <div className="h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(45 106 79 / 0.12)" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#2d6a4f" }} interval={0} angle={-25} textAnchor="end" height={52} />
            <YAxis
              yAxisId="mm"
              tick={{ fontSize: 11, fill: "#2d6a4f" }}
              label={{ value: "мм", angle: -90, position: "insideLeft", fill: "#2d6a4f", fontSize: 11 }}
            />
            <YAxis
              yAxisId="temp"
              orientation="right"
              tick={{ fontSize: 11, fill: "#0096c7" }}
              label={{ value: "°C", angle: 90, position: "insideRight", fill: "#0096c7", fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid rgb(45 106 79 / 0.15)",
                background: "rgb(254 250 224 / 0.95)",
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar yAxisId="mm" dataKey="precip" name="Осадки" fill="#48cae4" radius={[6, 6, 0, 0]} />
            <Line yAxisId="temp" type="monotone" dataKey="temp" name="Температура (ср.)" stroke="#f4a261" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line yAxisId="mm" type="monotone" dataKey="et0" name="ET₀" stroke="#2d6a4f" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
