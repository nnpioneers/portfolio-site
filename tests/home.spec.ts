import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Just checking that the page loads and has the NNP text or similar.
  // The actual title might be different depending on layout.
  await expect(page).toHaveTitle(/NNP/i);
});
