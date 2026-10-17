import { Card } from "@/components/ui/Card";
import { naryn } from "@/data/naryn";
import { FIXED_DAILY_LITERS_PER_M2, type WaterSavings } from "@/lib/water-savings";

type Props = {
  savings: WaterSavings;
};

export function WaterSaved({ savings }: Props) {
  const scale = Math.max(savings.baselineLiters, 1);
  const smartWidth = Math.min(100, (savings.smartLiters / scale) * 100);
  const savedPercent =
    savings.baselineLiters > 0 ? Math.round((savings.savedLiters / savings.baselineLiters) * 100) : 0;

  return (
    <Card title="Сэкономлено воды">
      <p key={savings.savedLiters.toFixed(1)} className="figure-swap text-5xl font-semibold tabular-nums tracking-tight text-solar-forest">
        {savings.savedLiters.toFixed(1)}
        <span className="ml-1 text-lg font-medium text-solar-forest/60">л/м²</span>
      </p>
      <p className="mt-2 text-sm leading-relaxed text-solar-forest/75">
        За {savings.days} дней это {savedPercent}% против традиционного пика:{" "}
        {FIXED_DAILY_LITERS_PER_M2} л/м² в день, или {naryn.traditionalPeakLitersPerHa.toLocaleString("ru-RU")}{" "}
        л/га. В исследованиях умного полива экономия обычно {naryn.smartSavingsPercent}%.
      </p>
      <div className="mt-5 space-y-3">
        <div>
          <div className="mb-1 flex justify-between text-xs text-solar-forest/60">
            <span>Каждый день</span>
            <span className="tabular-nums">{savings.baselineLiters.toFixed(0)} л</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-solar-forest/10">
            <div className="bar-fill h-full w-full rounded-full bg-solar-gold-deep/80" />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs text-solar-forest/60">
            <span>Умный полив</span>
            <span className="tabular-nums">{savings.smartLiters.toFixed(1)} л</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-solar-forest/10">
            <div
              className="bar-fill h-full rounded-full bg-solar-leaf"
              style={{ width: `${smartWidth}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
