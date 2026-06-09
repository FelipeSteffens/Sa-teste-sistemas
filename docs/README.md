Projeto: Loja de Celulares - Teste de Sistemas

Este repositório contém um frontend em React (JSX) e uma API em Node.js/Express com PostgreSQL.

Visão geral do que foi implementado:
- Backend: rotas, controllers, services e repositórios com testes de integração usando Jest + Supertest.
- Testes backend: rodam contra um banco PostgreSQL em memória via `pg-mem` (sem mocks manuais) — o schema é carregado de `api/db/create_tables.sql`.
- Frontend: JSX com componentes de Login / Register; adicionei seletores (`data-testid`) e um teste Playwright de exemplo em `frontend/tests`.
- Docs: instruções de execução e testes estão nesta pasta.

Como executar localmente (PowerShell)

Backend (tests com pg-mem):
```powershell
cd C:\Users\felipe_b_steffens\Desktop\Sa-teste-sistemas\api
npm install
npm test
```

Observações: os testes usam `pg-mem` para criar um banco em memória e aplicar o SQL de `api/db/create_tables.sql`.

Frontend (Playwright E2E — exemplo):
1) Instale dependências:
```powershell
cd C:\Users\felipe_b_steffens\Desktop\Sa-teste-sistemas\frontend
npm install
npm run install-playwright
```

2) Inicie o frontend (dev server) em um terminal:
```powershell
npm run dev
```

3) Em outro terminal, execute os testes Playwright:
```powershell
npm run e2e
```

Notas e próximos passos
- Se quiser rodar E2E em CI, prefira `playwright install --with-deps` no runner ou use imagens com browsers pré-instalados.
- Posso adicionar um script que inicia o frontend em background, aguarda a URL e executa Playwright automaticamente.
- Posso também gerar testes Playwright adicionais cobrindo fluxos de catálogo/carrinho/CRUD de celulares.

