import { test, expect } from '@playwright/test';
import { checkPageA11y } from './a11y-helper';

test.describe('Radar Route', () => {
  test('renders concise signals safely', async ({ page }) => {
    await page.goto('/radar');
    
    await expect(page.locator('h1', { hasText: 'Radar da Copa' })).toBeVisible();
    await expect(page.locator('.radar-item').first()).toBeVisible();

    await checkPageA11y(page);
  });
});
