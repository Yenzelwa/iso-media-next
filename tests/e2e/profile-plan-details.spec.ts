// @epic:profile-plan-details
import { test, expect } from '@playwright/test'

test.describe('@epic:profile-plan-details Plan Details main flows', () => {
  test('open/close modals and confirm flow is reachable', async ({ page }) => {
    // Navigate using baseURL from playwright.config.ts
    await page.goto('/profile')
    await page.waitForLoadState('domcontentloaded')

    // If not authenticated, the page shows a demo button. Use it to populate auth.
    const setDemoUser = page.getByRole('button', { name: /set demo user/i })
    if (await setDemoUser.count()) {
      await setDemoUser.click()
      await expect(page.getByRole('heading', { name: /my profile/i })).toBeVisible()
    }

    // Enter the Plan Details tab from the sidebar (robust text fallback)
    const planDetailsTabButton = page.getByRole('button', { name: /plan details/i })
    if (await planDetailsTabButton.count()) {
      await planDetailsTabButton.click()
    } else {
      await page.getByText(/plan details/i, { exact: false }).first().click()
    }

    // Wait for Plan Details to render
    await expect(
      page.getByRole('heading', { name: /all available plans/i })
    ).toBeVisible()

    // Manage Plan modal
    await page.getByTestId('manage-plan').click()
    await expect(page.getByRole('dialog', { name: /manage plan/i })).toBeVisible()
    await page.getByRole('button', { name: /close/i }).click()
    await expect(page.getByRole('dialog', { name: /manage plan/i })).toHaveCount(0)

    // Cancel Subscription modal
    await page.getByTestId('cancel-subscription').click()
    await expect(page.getByRole('dialog', { name: /cancel subscription/i })).toBeVisible()
    await page.getByRole('button', { name: /keep subscription/i }).click()
    await expect(page.getByRole('dialog', { name: /cancel subscription/i })).toHaveCount(0)

    // Plan card action (Downgrade/Upgrade) -> Confirm modal
    const actionBtn = page.getByRole('button', { name: /(downgrade|upgrade) plan/i })
    if (await actionBtn.count()) {
      await actionBtn.first().click()
      await expect(page.getByTestId('confirm-change-modal')).toBeVisible()
      await page.getByTestId('cancel-plan-change').click()
      await expect(page.getByTestId('confirm-change-modal')).toHaveCount(0)
    }

    // Change Plan button (top-right) -> options -> Confirm modal
    const changePlanBtn = page.getByTestId('upgrade-popup')
    if (await changePlanBtn.count()) {
      await changePlanBtn.click()
      await expect(page.getByRole('dialog', { name: /change plan/i })).toBeVisible()

      // Pick the first available plan option if present
      const optionsListFirst = page.locator('div', { hasText: /available plan options/i }).locator('button').first()
      if (await optionsListFirst.count()) {
        await optionsListFirst.click()
        await expect(page.getByTestId('confirm-change-modal')).toBeVisible()
        // Close via Cancel to avoid mutating state
        await page.getByTestId('cancel-plan-change').click()
        await expect(page.getByTestId('confirm-change-modal')).toHaveCount(0)
      } else {
        // Or just close the Change Plan modal
        await page.getByRole('button', { name: /cancel/i }).click()
      }
    }
  })
})
