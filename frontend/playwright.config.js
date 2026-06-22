// Playwright basic config
import { defineConfig } from '@playwright/test';
import process from 'node:process';

const executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH;

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  webServer: [
    {
      command: 'node src/server.js',
      cwd: '../api',
      url: 'http://localhost:3000/api/cellphones/listar',
      reuseExistingServer: true,
      timeout: 120 * 1000,
    },
    {
      command: 'node node_modules/vite/bin/vite.js --host localhost --port 5173',
      cwd: '.',
      url: 'http://localhost:5173',
      reuseExistingServer: true,
      timeout: 120 * 1000,
    },
  ],
  use: {
    headless: true,
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173',
    ...(executablePath
      ? { launchOptions: { executablePath } }
      : { channel: 'chrome' }),
  },
});
