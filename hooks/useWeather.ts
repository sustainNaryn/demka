"use client";

import { useCallback, useEffect, useState } from "react";
import type { WeatherForecast } from "@/lib/weather";

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: WeatherForecast };

export function useWeather() {
  const [state, setState] = useState<State>({ status: "loading" });

  const load = useCallback(async () => {
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/weather");
      const body = await res.json();
      if (!res.ok) {
        const msg = typeof body.error === "string" ? body.error : "Ошибка загрузки";
        setState({ status: "error", message: msg });
        return;
      }
      setState({ status: "ready", data: body as WeatherForecast });
    } catch {
      setState({ status: "error", message: "Нет связи с сервером. Проверьте сеть." });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { state, reload: load };
}
