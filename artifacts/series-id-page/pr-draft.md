# PR Draft — Series/[id] Page Epic

## What changed
- replace episode thumbnail sizing with `aspect-video` to match design ratios.
- strip hover play overlay from episode cards and simplify hero badges/meta to remove likes/time stats.
- remove secondary engagement buttons so only the primary Play CTA remains.
- update series detail RTL suite with explicit fetch mocks and new DOM assertions; refreshed snapshot.

## Tests
- `npm test -- --runTestsByPath __tests__/app/root/series/[id]/page.test.tsx --updateSnapshot`

## Screenshots
- Before: `artifacts/series-id-page/screnshoot/before.png`
- After: `artifacts/series-id-page/screnshoot/after.png`
