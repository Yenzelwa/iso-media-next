import { expect } from '@playwright/test';
import { test } from './axe';

test.describe('Profile > Security & Privacy @epic:profile-settings-privacy', () => {
  test('2FA modal keyboard path + axe critical-free', async ({ page, checkA11y }) => {
    await page.goto('/profile');

    // Bootstrap demo auth to access profile
    await page.getByRole('button', { name: /set demo user/i }).click();

    // Navigate to Security & Privacy tab
    await page.getByRole('button', { name: /security & privacy/i }).click();

    // Keyboard-first: focus 2FA toggle and open with Enter
    await page.getByTestId('toggle').focus();
    await expect(page.getByTestId('toggle')).toBeFocused();
    await page.keyboard.press('Enter');

    // Modal should appear and be labelled correctly
    await expect(page.getByRole('dialog', { name: /enable two-factor authentication/i })).toBeVisible();

    // Axe critical issues gate
    await checkA11y();

    // Close with Escape and verify hidden
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: /enable two-factor authentication/i })).toBeHidden({ timeout: 2000 });
  });
});

