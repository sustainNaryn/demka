"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { demoSolarChargePercent, generateSoilMoisture24h } from "@/lib/demo-sensor";

export function SoilSensorDemo() {
  const moisture = useMemo(() => generateSoilMoisture24h(), []);
  const solar = useMemo(() => demoSolarChargePercent(), []);

  return (
    <Card title="Датчик почвы (демо)">
      <p className="mb-3 text-xs text-solar-forest/55">демо-данные</p>
      <div className="mb-4 flex items-center justify-between gap-4 rounded-xl bg-white/45 px-3 py-3">
        <div>
          <p className="text-xs text-solar-forest/60">Солнечная панель</p>
          <p className="text-lg font-semibold tabular-nums text-solar-forest">{solar}%</p>
        </div>
        <div className="h-3 flex-1 max-w-[200px] overflow-hidden rounded-full bg-solar-forest/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-solar-gold to-solar-leaf transition-all"
            style={{ width: `${solar}%` }}
          />
        </div>
      </div>
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={moisture} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="moistureFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#52b788" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#95d5b2" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(45 106 79 / 0.1)" />
            <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "#2d6a4f" }} interval={3} />
            <YAxis domain={[15, 85]} tick={{ fontSize: 10, fill: "#2d6a4f" }} unit="%" width={36} />
            <Tooltip
              formatter={(v: number) => [`${v}%`, "Влажность"]}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid rgb(45 106 79 / 0.15)",
                background: "rgb(254 250 224 / 0.95)",
              }}
            />
            <Area
              type="monotone"
              dataKey="moisture"
              name="Влажность"
              stroke="#2d6a4f"
              fill="url(#moistureFill)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
