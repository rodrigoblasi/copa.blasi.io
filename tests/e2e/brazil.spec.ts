import { test, expect } from '@playwright/test';
import { checkPageA11y } from './a11y-helper';

test.describe('Brazil Route', () => {
  test('renders Brazil path and context securely', async ({ page }) => {
    await page.goto('/brasil');
    
    await expect(page.locator('h1', { hasText: 'Caminho do Brasil' })).toBeVisible();
    await expect(page.locator('text=Fase de Grupos')).toBeVisible();
    await expect(page.locator('text=Mata-Mata')).toBeVisible();
    
    // Check for the Brazil match block
    await expect(page.locator('text=br').first()).toBeVisible();

    await checkPageA11y(page);
  });
});
