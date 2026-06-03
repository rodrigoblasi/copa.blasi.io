import { test, expect } from '@playwright/test';

test.describe('Public Hygiene Checks', () => {
  test('Pages do not expose internal paths in HTML', async ({ page }) => {
    const response = await page.goto('/');
    const html = await response?.text() || '';
    
    // Simple naive check that local machine paths didn't leak into the build
    expect(html).not.toContain('/home/ubuntu');
    expect(html).not.toContain('file://');
  });
});
