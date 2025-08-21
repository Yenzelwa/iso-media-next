export function formatThumbsCount(count: number): string {
  if (count < 1_000) return String(count);

  if (count < 1_000_000) {
    // Truncate to 1 decimal in thousands, e.g. 3449 -> 3.4k, 3450 -> 3.4k, 3500 -> 3.5k
    const truncated = Math.floor((count / 1_000) * 10) / 10;
    return `${truncated.toFixed(1)}k`;
  }

  // Truncate to 1 decimal in millions
  const truncated = Math.floor((count / 1_000_000) * 10) / 10;
  return `${truncated.toFixed(1)}M`;
}
