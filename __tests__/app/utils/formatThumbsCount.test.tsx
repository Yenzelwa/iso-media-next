import { formatThumbsCount } from '@/src/utils/formatThumbsCount';

test('thousands are truncated, not rounded', () => {
  expect(formatThumbsCount(3449)).toBe('3.4k');
  expect(formatThumbsCount(3450)).toBe('3.4k');
  expect(formatThumbsCount(3499)).toBe('3.4k');
  expect(formatThumbsCount(3500)).toBe('3.5k');
});

test('millions are truncated, not rounded', () => {
  expect(formatThumbsCount(1_249_999)).toBe('1.2M');
  expect(formatThumbsCount(1_250_000)).toBe('1.2M');
  expect(formatThumbsCount(1_299_999)).toBe('1.2M');
  expect(formatThumbsCount(1_300_000)).toBe('1.3M');
});
