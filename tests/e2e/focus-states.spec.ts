import { test, expect } from '@playwright/test';

test.describe('Focus States', () => {
  test('interactive elements have visible focus rings', async ({ page }) => {
    await page.goto('/');
    
    // Press Tab to focus the first interactive element (skip link or nav link)
    await page.keyboard.press('Tab');
    
    const isFocused = await page.evaluate(() => {
      const active = document.activeElement;
      if (!active) return false;
      const styles = window.getComputedStyle(active);
      // Check if there is an outline or box-shadow (focus ring)
      return styles.outlineStyle !== 'none' || styles.boxShadow !== 'none';
    });
    
    expect(isFocused).toBe(true);
  });
});
