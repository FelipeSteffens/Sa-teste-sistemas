import { test, expect } from '@playwright/test';

test('register and login flows', async ({ page }) => {
  const email = `e2e_user_${Date.now()}@example.com`;

  // go to app
  await page.goto('/');

  // open register modal
  await page.click('[data-testid="open-register"]');

  // fill register
  await page.fill('[data-testid="register-name"]', 'Usuario E2E');
  await page.fill('[data-testid="register-email"]', email);
  await page.fill('[data-testid="register-password"]', 'password123');
  await page.fill('[data-testid="register-confirm"]', 'password123');
  await page.click('[data-testid="register-submit"]');

  // wait for success toast or modal close (simple wait)
  await page.waitForTimeout(500);

  // perform login
  await page.fill('[data-testid="login-email"]', email);
  await page.fill('[data-testid="login-password"]', 'password123');
  await page.click('[data-testid="login-submit"]');

  // after login, the app navigates to /dashboard
  await page.waitForURL('**/dashboard');
  await expect(
    page.getByRole('heading', { name: 'Dashboard', exact: true })
  ).toBeVisible();
});
