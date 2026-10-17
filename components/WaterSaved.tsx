import { Card } from "@/components/ui/Card";
import { FIXED_DAILY_LITERS_PER_M2, type WaterSavings } from "@/lib/water-savings";

type Props = {
  savings: WaterSavings;
};

export function WaterSaved({ savings }: Props) {
  return (
    <Card title="Сэкономлено воды">
      <p className="text-3xl font-bold tabular-nums text-solar-forest">
        {savings.savedLiters.toFixed(1)}
        <span className="ml-1 text-lg font-semibold text-solar-forest/70">л/м²</span>
      </p>
      <p className="mt-2 text-sm text-solar-forest/75">
        За {savings.days} дней умный полив даёт {savings.smartLiters.toFixed(1)} л/м² вместо{" "}
        {savings.baselineLiters.toFixed(0)} л/м² при ежедневной норме {FIXED_DAILY_LITERS_PER_M2}{" "}
        л/м².
      </p>
    </Card>
  );
}
