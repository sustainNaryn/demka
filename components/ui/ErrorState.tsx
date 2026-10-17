type Props = {
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="glass-card rounded-2xl border-red-300/40 p-6 text-center">
      <p className="font-medium text-red-800">Не удалось получить данные</p>
      <p className="mt-2 text-sm text-red-900/70">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-xl bg-solar-forest px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-solar-forest/90"
        >
          Повторить
        </button>
      ) : null}
    </div>
  );
}
