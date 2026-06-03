import { test, expect } from '@playwright/test';
import { checkPageA11y } from './a11y-helper';

test.describe('Match Detail Route', () => {
  test('renders match details and return link', async ({ page }) => {
    // Navigates to the seed fixture match
    await page.goto('/jogos/brazil-serbia');
    
    await expect(page.locator('h1').or(page.locator('.team-name', { hasText: 'Brazil' })).first()).toBeVisible();
    await expect(page.locator('text=Serbia')).toBeVisible();
    
    const backLink = page.locator('text=Voltar para o Tabelão');
    await expect(backLink).toBeVisible();

    await checkPageA11y(page);
  });
});
