export function LoadingState({ label = "Загружаем прогноз…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-solar-forest/80">
      <div
        className="h-10 w-10 animate-spin rounded-full border-[3px] border-solar-moss border-t-solar-gold-deep"
        aria-hidden
      />
      <p className="text-sm">{label}</p>
    </div>
  );
}
