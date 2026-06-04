import { test, expect } from '@playwright/test';
import { checkPageA11y } from './a11y-helper';

test.describe('Match Detail Route', () => {
  test('renders match details and return link', async ({ page }) => {
    // Navigates to the seed fixture match
    await page.goto('/jogos/brasil-marrocos');
    
    await expect(page.locator('h1').or(page.locator('.team-name', { hasText: 'Brasil' })).first()).toBeVisible();
    await expect(page.getByText('Marrocos', { exact: true })).toBeVisible();
    
    const backLink = page.locator('text=Voltar para o guia da Copa');
    await expect(backLink).toBeVisible();

    await checkPageA11y(page);
  });
});
