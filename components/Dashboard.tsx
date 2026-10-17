"use client";

import { useMemo, useState } from "react";
import { CropSelect } from "@/components/CropSelect";
import { DashboardShell } from "@/components/DashboardShell";
import { IrrigationCalendar } from "@/components/IrrigationCalendar";
import { SoilSensorDemo } from "@/components/SoilSensorDemo";
import { TodayCard } from "@/components/TodayCard";
import { WeatherChart } from "@/components/WeatherChart";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { defaultCropId, getCropById } from "@/data/crops";
import { useWeather } from "@/hooks/useWeather";
import { buildIrrigationSchedule } from "@/lib/irrigation";
import { toDayForecasts } from "@/lib/weather";

export function Dashboard() {
  const { state, reload } = useWeather();
  const [cropId, setCropId] = useState(defaultCropId);
  const crop = getCropById(cropId);

  const days = useMemo(() => {
    if (state.status !== "ready") return [];
    return toDayForecasts(state.data);
  }, [state]);

  const schedule = useMemo(
    () => buildIrrigationSchedule(days, crop.kc),
    [days, crop.kc],
  );

  const today = days[0];
  const todaySchedule = schedule[0];

  return (
    <DashboardShell>
      <div className="mb-4">
        <CropSelect value={cropId} onChange={setCropId} />
      </div>

      {state.status === "loading" ? <LoadingState /> : null}
      {state.status === "error" ? (
        <ErrorState message={state.message} onRetry={reload} />
      ) : null}

      {state.status === "ready" && today && todaySchedule ? (
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <TodayCard
            dateLabel={today.label}
            litersPerM2={todaySchedule.litersPerM2}
            verdict={todaySchedule.verdict}
            et0={today.et0}
            precipitation={today.precipitation}
            kc={crop.kc}
          />
          <IrrigationCalendar days={schedule} />
          <div className="lg:col-span-2">
            <WeatherChart days={days} />
          </div>
          <div className="lg:col-span-2">
            <SoilSensorDemo />
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
}
