"use client";

import { greenhouseHint, greenhouseLabel } from "@/data/greenhouse";

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export function GreenhouseToggle({ checked, onChange }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`control-surface flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left ${
        checked ? "is-on" : ""
      }`}
    >
      <span
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          checked ? "bg-solar-leaf" : "bg-solar-forest/15"
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </span>
      <span>
        <span className="block text-sm font-medium text-solar-forest">
          {greenhouseLabel}
          <span className="ml-2 text-xs font-normal text-solar-forest/55">
            {checked ? "включена" : "выключена"}
          </span>
        </span>
        <span className="mt-0.5 block text-xs leading-snug text-solar-forest/65">{greenhouseHint}</span>
      </span>
    </button>
  );
}
