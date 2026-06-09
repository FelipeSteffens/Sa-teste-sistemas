import { test, expect } from '@playwright/test';

test('fluxo de cadastro e login', async ({ page }) => {
  // abrir a aplicação
  await page.goto('/');

  // abrir modal de cadastro
  await page.click('[data-testid="open-register"]');

  // preencher cadastro
  await page.fill('[data-testid="register-email"]', 'e2e_user@example.com');
  await page.fill('[data-testid="register-password"]', 'password123');
  await page.fill('[data-testid="register-confirm"]', 'password123');
  await page.click('[data-testid="register-submit"]');

  // aguardar o modal fechar ou toast de sucesso
  await page.waitForTimeout(500);

  // executar login
  await page.fill('[data-testid="login-email"]', 'e2e_user@example.com');
  await page.fill('[data-testid="login-password"]', 'password123');
  await page.click('[data-testid="login-submit"]');

  // após login, a aplicação navega para /painel
  await page.waitForURL('**/painel');
  await expect(page.locator('h1')).toContainText('Painel');
});
