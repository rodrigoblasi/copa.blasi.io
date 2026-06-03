import { test, expect } from '@playwright/test';
import { checkPageA11y } from './a11y-helper';

test.describe('Home Tabelao', () => {
  test('renders primary elements and passes accessibility', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('h1', { hasText: 'FIFA World Cup 2026' })).toBeVisible();
    await expect(page.locator('text=Acompanhe o Brasil')).toBeVisible();
    await expect(page.locator('text=Group G')).toBeVisible();
    await expect(page.locator('text=Mata-Mata')).toBeVisible();

    await checkPageA11y(page);
  });
});
