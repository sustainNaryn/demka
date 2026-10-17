export function LoadingState({ label = "Считаем прогноз по архиву Нарына…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-solar-forest/80">
      <div
        className="h-12 w-12 animate-spin rounded-full border-[3px] border-solar-gold/80 border-t-solar-leaf shadow-[0_0_24px_rgb(255_209_102_/_0.45)]"
        aria-hidden
      />
      <p className="text-sm">{label}</p>
    </div>
  );
}
