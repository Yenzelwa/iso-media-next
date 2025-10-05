import { test as base } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export const test = base.extend<{ checkA11y: () => Promise<void> }>({
  checkA11y: async ({ page }, use) => {
    await use(async () => {
      const results = await new AxeBuilder({ page }).analyze();
      const critical = results.violations.filter((v) => v.impact === 'critical');
      if (critical.length) {
        console.error('axe critical violations:', JSON.stringify(critical, null, 2));
        throw new Error(`axe: critical violations found (${critical.length})`);
      }
    });
  },
});
export const expect = test.expect;

