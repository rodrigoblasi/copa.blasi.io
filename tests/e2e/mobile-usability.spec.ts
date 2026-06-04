import { test, expect } from '@playwright/test';

test.describe('Mobile Usability', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // Mobile viewport

  test('home stacks correctly on mobile without horizontal scroll', async ({ page }) => {
    await page.goto('/');
    
    // Evaluate if there's horizontal scrolling (a major usability failure on mobile)
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    
    expect(hasHorizontalScroll).toBe(false);
  });

  test('mobile bracket preserves round order and match context', async ({ page }) => {
    await page.goto('/');

    const bracket = page.locator('.bracket');
    await expect(bracket).toContainText('32 avos de final');
    await expect(bracket).toContainText('Oitavas de final');
    await expect(bracket).toContainText('Quartas de final');
    await expect(bracket).toContainText('Semifinal');
    await expect(bracket.locator('.bracket-match').first()).toContainText('BRT');
    await expect(bracket.locator('.bracket-match').first()).not.toContainText('?');
  });
});
