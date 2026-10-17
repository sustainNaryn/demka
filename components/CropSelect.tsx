"use client";

import { crops } from "@/data/crops";

type Props = {
  value: string;
  onChange: (id: string) => void;
};

export function CropSelect({ value, onChange }: Props) {
  const crop = crops.find((c) => c.id === value) ?? crops[0];

  return (
    <label className="control-surface block rounded-3xl px-4 py-3">
      <span className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-solar-forest">Культура</span>
        <span className="rounded-full bg-solar-moss/40 px-2.5 py-0.5 text-xs font-semibold text-solar-forest">
          Kc {crop.kc}
        </span>
      </span>
      <span className="relative mt-2 block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent pr-8 text-base font-medium text-solar-forest outline-none"
        >
          {crops.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-xs text-solar-forest/50" aria-hidden>
          ▼
        </span>
      </span>
    </label>
  );
}
