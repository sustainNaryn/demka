"use client";

import { crops } from "@/data/crops";

type Props = {
  value: string;
  onChange: (id: string) => void;
};

export function CropSelect({ value, onChange }: Props) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-solar-forest">Культура</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-solar-forest/15 bg-white/80 px-3 py-2.5 text-solar-forest shadow-sm outline-none ring-solar-leaf focus:ring-2"
      >
        {crops.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} (Kc = {c.kc})
          </option>
        ))}
      </select>
    </label>
  );
}
