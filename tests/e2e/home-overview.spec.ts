import { test, expect } from '@playwright/test';
import { checkPageA11y } from './a11y-helper';

test.describe('Home Tabelao', () => {
  test('renders primary elements and passes accessibility', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('h1', { hasText: 'Guia da Copa do Mundo 2026' })).toBeVisible();
    await expect(page.locator('text=Brasil na Copa')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Grupo C' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Fase Eliminatória' })).toBeVisible();

    await checkPageA11y(page);
  });

  test('home match cards expose shared card details and emphasis labels', async ({ page }) => {
    await page.goto('/');

    const brazilCard = page.locator('.match-block.emphasis-brazil').first();
    await expect(brazilCard).toContainText('BRT');
    await expect(brazilCard).toContainText('- x -');
    await expect(brazilCard).toContainText('Jogo do Brasil');
    await expect(page.locator('.match-block.emphasis-brazil a[href*="google.com/maps"]').first()).toBeVisible();

    const groupCCard = page.locator('.match-block.emphasis-group-c').first();
    await expect(groupCCard).toContainText('Jogo do Grupo C');
  });

  test('bracket uses two sides and official round order', async ({ page }) => {
    await page.goto('/');

    const bracket = page.locator('.bracket');
    await expect(bracket.locator('.bracket-side.left')).toBeVisible();
    await expect(bracket.locator('.bracket-center')).toContainText('Final');
    await expect(bracket.locator('.bracket-center')).toContainText('Disputa de 3º lugar');
    await expect(bracket).toContainText('32 avos de final');
    await expect(bracket).toContainText('Oitavas de final');
    await expect(bracket).toContainText('Quartas de final');
    await expect(bracket).toContainText('Semifinal');
  });
});
