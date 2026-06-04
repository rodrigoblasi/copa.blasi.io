import { test, expect } from '@playwright/test';

test.describe('Public Hygiene Checks', () => {
  test('Pages do not expose internal paths in HTML', async ({ page }) => {
    const response = await page.goto('/');
    const html = await response?.text() || '';
    
    // Simple naive check that local machine paths didn't leak into the build
    expect(html).not.toContain('/home/ubuntu');
    expect(html).not.toContain('file://');
  });

  test('public pages use official terminology and polished metadata', async ({ page }) => {
    for (const route of ['/', '/calendario', '/brasil', '/radar', '/jogos/brasil-marrocos']) {
      await page.goto(route);
      const html = await page.content();
      expect(await page.title()).not.toContain('MVP');
      expect(html).not.toContain('Mata-Mata');
      expect(html).not.toContain('visão geral Z');
      expect(html).not.toContain('TBD');
    }

    await page.goto('/');
    await expect(page.locator('text=Fase Eliminatória').first()).toBeVisible();
    await expect(page.locator('text=32 avos de final').first()).toBeVisible();
    await expect(page.locator('text=Oitavas de final').first()).toBeVisible();
    await expect(page.locator('text=Quartas de final').first()).toBeVisible();
    await expect(page.locator('text=Semifinal').first()).toBeVisible();
    await expect(page.locator('text=Disputa de 3º lugar').first()).toBeVisible();
    await expect(page.locator('text=Final').first()).toBeVisible();

    await page.goto('/jogos/brasil-marrocos');
    await expect(page.locator('.match-header-hero .phase')).toContainText('Fase de Grupos');
    await expect(page.locator('.match-header-hero')).not.toContainText('phaseId');
    await expect(page.locator('.match-header-hero')).not.toContainText('TBD');
  });

  test('base layout exposes favicon links', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('head link[rel="icon"][type="image/svg+xml"][href="/favicon.svg"]')).toHaveCount(1);
    await expect(page.locator('head link[rel="icon"][type="image/x-icon"][href="/favicon.ico"]')).toHaveCount(1);
    await expect(page.locator('head link[rel="apple-touch-icon"][href="/apple-touch-icon.png"]')).toHaveCount(1);
  });
});
