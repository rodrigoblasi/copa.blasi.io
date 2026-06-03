import { Page, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export async function checkPageA11y(page: Page) {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  
  if (accessibilityScanResults.violations.length > 0) {
    console.error('Accessibility violations:', JSON.stringify(accessibilityScanResults.violations, null, 2));
  }
  
  expect(accessibilityScanResults.violations).toEqual([]);
}
