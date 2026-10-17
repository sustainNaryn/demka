export type Crop = {
  id: string;
  name: string;
  /** Культураный коэффициент Kc (FAO, средний вегетационный период) */
  kc: number;
};

export const crops: Crop[] = [
  { id: "tomato", name: "Помидоры", kc: 1.15 },
  { id: "cucumber", name: "Огурцы", kc: 1.0 },
  { id: "potato", name: "Картофель", kc: 1.1 },
  { id: "apple", name: "Яблоня", kc: 0.85 },
  { id: "grape", name: "Виноград", kc: 0.75 },
];

export const defaultCropId = crops[0].id;

export function getCropById(id: string): Crop {
  return crops.find((c) => c.id === id) ?? crops[0];
}
