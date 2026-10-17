export type Crop = {
  id: string;
  name: string;
  /** Коэффициент культуры Kc (средний вегетационный период) */
  kc: number;
};

export const crops: Crop[] = [
  { id: "potato", name: "Картофель", kc: 1.1 },
  { id: "cabbage", name: "Капуста", kc: 0.95 },
  { id: "carrot", name: "Морковь", kc: 0.9 },
  { id: "beet", name: "Свёкла", kc: 0.9 },
  { id: "onion", name: "Лук", kc: 0.85 },
  { id: "greens", name: "Зелень", kc: 0.95 },
  { id: "tomato", name: "Помидоры", kc: 1.15 },
  { id: "cucumber", name: "Огурцы", kc: 1.0 },
];

export const defaultCropId = crops[0].id;

export function getCropById(id: string): Crop {
  return crops.find((c) => c.id === id) ?? crops[0];
}
