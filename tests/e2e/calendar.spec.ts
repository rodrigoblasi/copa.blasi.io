import { test, expect } from '@playwright/test';
import { checkPageA11y } from './a11y-helper';

test.describe('Calendar Route', () => {
  test('renders phases, dates, and matches correctly', async ({ page }) => {
    await page.goto('/calendario');
    
    await expect(page.locator('h1', { hasText: 'Calendário completo da Copa' })).toBeVisible();
    await expect(page.locator('.phase-calendar').first()).toBeVisible();
    
    // Check for Brazil match from seed data
    await expect(page.locator('text=Quinta-feira, 11 de jun')).toBeVisible();

    await checkPageA11y(page);
  });
});
