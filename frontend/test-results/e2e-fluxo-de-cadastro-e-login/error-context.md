# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.js >> fluxo de cadastro e login
- Location: tests\e2e.spec.js:3:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
Call log:
  - navigating to "http://localhost:5174/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('fluxo de cadastro e login', async ({ page }) => {
  4  |   // abrir a aplicação
> 5  |   await page.goto('/');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
  6  | 
  7  |   // abrir modal de cadastro
  8  |   await page.click('[data-testid="open-register"]');
  9  | 
  10 |   // preencher cadastro
  11 |   await page.fill('[data-testid="register-email"]', 'e2e_user@example.com');
  12 |   await page.fill('[data-testid="register-password"]', 'password123');
  13 |   await page.fill('[data-testid="register-confirm"]', 'password123');
  14 |   await page.click('[data-testid="register-submit"]');
  15 | 
  16 |   // aguardar o modal fechar ou toast de sucesso
  17 |   await page.waitForTimeout(500);
  18 | 
  19 |   // executar login
  20 |   await page.fill('[data-testid="login-email"]', 'e2e_user@example.com');
  21 |   await page.fill('[data-testid="login-password"]', 'password123');
  22 |   await page.click('[data-testid="login-submit"]');
  23 | 
  24 |   // após login, a aplicação navega para /painel
  25 |   await page.waitForURL('**/painel');
  26 |   await expect(page.locator('h1')).toContainText('Painel');
  27 | });
  28 | 
```