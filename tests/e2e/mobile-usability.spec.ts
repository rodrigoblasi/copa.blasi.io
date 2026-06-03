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
});
