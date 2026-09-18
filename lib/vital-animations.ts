const FREE_VITAL_IDS = new Set(Array.from({ length: 50 }, (_, i) => String(51 + i).padStart(4, '0')));

export function vitalAnimationUrl(id: string) {
  const normalized = String(id).padStart(4, '0');
  return FREE_VITAL_IDS.has(normalized) ? `/exercises/vital/${normalized}.mp4` : null;
}
