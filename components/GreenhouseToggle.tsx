"use client";

import { greenhouseHint, greenhouseLabel } from "@/data/greenhouse";

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export function GreenhouseToggle({ checked, onChange }: Props) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-solar-forest/15 bg-white/70 px-3 py-2.5 shadow-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-solar-forest"
      />
      <span>
        <span className="block text-sm font-medium text-solar-forest">{greenhouseLabel}</span>
        <span className="mt-0.5 block text-xs text-solar-forest/65">{greenhouseHint}</span>
      </span>
    </label>
  );
}
