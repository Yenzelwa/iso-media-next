// Date formatting utilities
export function yearFrom(dateLike: unknown, fallback = ''): string {
  if (typeof dateLike !== 'string' || !dateLike) return fallback;
  const d = new Date(dateLike);
  return Number.isNaN(d.getTime()) ? fallback : String(d.getFullYear());
}

export function formatYYYYMMDD(dateLike: unknown, fallback = ''): string {
  if (!dateLike) return fallback;
  const d = dateLike instanceof Date ? dateLike : new Date(String(dateLike));
  if (Number.isNaN(d.getTime())) return fallback;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}/${m}/${day}`;
}

