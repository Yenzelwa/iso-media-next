 export const toCents = (v?: string | number | null) => {
  if (typeof v === 'number') return Math.round(v * 100); // assume dollars
  if (!v) return 0;
  const cleaned = String(v).replace(/[^\d.-]/g, ''); // strip $, commas, spaces
  const num = Number.parseFloat(cleaned);
  return Number.isFinite(num) ? Math.round(num * 100) : 0;
};