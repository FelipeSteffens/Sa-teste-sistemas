const { test, expect } = require('@playwright/test');

test('register and login flows', async ({ page }) => {
  // go to app
  await page.goto('/');

  // open register modal
  await page.click('[data-testid="open-register"]');

  // fill register
  await page.fill('[data-testid="register-email"]', 'e2e_user@example.com');
  await page.fill('[data-testid="register-password"]', 'password123');
  await page.fill('[data-testid="register-confirm"]', 'password123');
  await page.click('[data-testid="register-submit"]');

  // wait for success toast or modal close (simple wait)
  await page.waitForTimeout(500);

  // perform login
  await page.fill('[data-testid="login-email"]', 'e2e_user@example.com');
  await page.fill('[data-testid="login-password"]', 'password123');
  await page.click('[data-testid="login-submit"]');

  // after login, the app navigates to /dashboard
  await page.waitForURL('**/dashboard');
  await expect(page.locator('h1')).toContainText('Dashboard');
});
