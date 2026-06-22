# Catálogo de Celulares

## Título do Projeto

Sistema web para cadastro e gerenciamento de um catálogo de celulares.

## Objetivo

Desenvolver uma aplicação completa, composta por uma API REST e uma interface web, que permita cadastrar usuários, realizar login e gerenciar celulares armazenados em um banco de dados PostgreSQL.

O projeto aplica separação de responsabilidades na API, componentização no front-end, persistência de dados, rotas protegidas e testes automatizados.

---

# PARTE 1: Visão Geral do Projeto

## 1. Tecnologias Utilizadas

### Back-end

- Node.js
- Express
- PostgreSQL
- Biblioteca `pg`
- dotenv
- CORS
- Jest
- Supertest
- pg-mem

### Front-end

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- React Icons
- React Toastify
- Playwright

---

## 2. Arquitetura

A aplicação está dividida em dois projetos principais:

- `api`: servidor responsável pelas regras da aplicação, rotas HTTP e comunicação com o PostgreSQL.
- `frontend`: interface web responsável pelo login, dashboard e gerenciamento do catálogo.

A API utiliza arquitetura em camadas:

1. **Routes:** definem os endereços disponíveis.
2. **Controllers:** recebem as requisições e definem as respostas HTTP.
3. **Services:** organizam as operações da aplicação.
4. **Repositories:** executam as consultas SQL no banco de dados.
5. **Config:** configura a conexão com PostgreSQL e o banco em memória usado nos testes.

O front-end utiliza páginas, componentes reutilizáveis, contexto de autenticação, layouts e um cliente Axios centralizado.

---

## 3. Estrutura Resumida

```text
Sa-teste-sistemas/
|-- api/
|   |-- db/
|   |   `-- create_tables.sql
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- middlewares/
|   |   |-- repositories/
|   |   |-- routes/
|   |   |-- services/
|   |   |-- app.js
|   |   `-- server.js
|   |-- tests/
|   |   |-- cellphones.test.js
|   |   `-- users.test.js
|   `-- package.json
|-- frontend/
|   |-- src/
|   |   |-- assets/
|   |   |-- components/
|   |   |-- contexts/
|   |   |-- layouts/
|   |   |-- pages/
|   |   |-- services/
|   |   `-- main.jsx
|   |-- tests/
|   |   `-- e2e.spec.js
|   |-- playwright.config.js
|   `-- package.json
`-- doc/
    `-- documentacao_projeto.md
```

---

# PARTE 2: Requisitos

## ENTREGA 01 - Requisitos Funcionais

| ID | Requisito | Descrição |
|---|---|---|
| RF-01 | Cadastrar usuário | Permitir o cadastro de usuário com nome, e-mail e senha. |
| RF-02 | Autenticar usuário | Validar e-mail e senha para permitir acesso ao sistema. |
| RF-03 | Manter sessão | Armazenar os dados da sessão no navegador e proteger as páginas internas. |
| RF-04 | Listar celulares | Exibir todos os celulares cadastrados no banco de dados. |
| RF-05 | Cadastrar celular | Cadastrar marca, modelo, cor, preço e descrição. |
| RF-06 | Editar celular | Atualizar todos os dados de um celular existente. |
| RF-07 | Excluir celular | Excluir um celular após confirmação do usuário. |
| RF-08 | Consultar celular por ID | Retornar um celular específico por meio da API. |
| RF-09 | Exibir total no dashboard | Mostrar a quantidade de celulares cadastrados. |
| RF-10 | Informar resultados | Exibir mensagens de sucesso, carregamento, lista vazia e erro. |
| RF-11 | Encerrar sessão | Permitir que o usuário saia e seja redirecionado para o login. |

## Requisitos Não Funcionais

| ID | Requisito | Descrição |
|---|---|---|
| RNF-01 | Persistência | Utilizar PostgreSQL para armazenar usuários e celulares. |
| RNF-02 | Responsividade | Adaptar as principais telas para computador e celular. |
| RNF-03 | Organização | Separar a API em rotas, controllers, services e repositories. |
| RNF-04 | Testabilidade | Utilizar banco em memória para os testes automatizados da API. |
| RNF-05 | Configuração | Manter credenciais e configurações em variáveis de ambiente. |

---

# PARTE 3: Banco de Dados

## 4. Tabela `users`

| Campo | Tipo | Regra |
|---|---|---|
| `id` | SERIAL | Chave primária |
| `nome` | VARCHAR(100) | Obrigatório |
| `email` | VARCHAR(100) | Obrigatório e único |
| `senha` | VARCHAR(255) | Obrigatório |

## 5. Tabela `cellphones`

| Campo | Tipo | Regra |
|---|---|---|
| `id` | SERIAL | Chave primária |
| `marca` | VARCHAR(50) | Obrigatório |
| `modelo` | VARCHAR(50) | Obrigatório |
| `cor` | VARCHAR(30) | Obrigatório |
| `preco` | NUMERIC | Obrigatório |
| `descricao` | VARCHAR(100) | Obrigatório |
| `data_cadastro` | TIMESTAMP | Preenchido automaticamente |

O script de criação está disponível em `api/db/create_tables.sql`.

---

# PARTE 4: Documentação da API

## 6. Endereço Base

```text
http://localhost:3000/api
```

## 7. Rotas de Usuários

| Método | Endpoint | Descrição | Sucesso |
|---|---|---|---|
| POST | `/users/register` | Cadastra um usuário. | 201 |
| GET | `/users/listar` | Lista todos os usuários. | 200 |
| GET | `/users/listar/:id` | Busca um usuário pelo ID. | 200 |
| PUT | `/users/atualizar/:id` | Atualiza um usuário. | 200 |
| DELETE | `/users/deletar/:id` | Exclui um usuário. | 204 |

### Exemplo de cadastro de usuário

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "senha123"
}
```

Campos obrigatórios: `nome`, `email` e `senha`.

## 8. Rotas de Celulares

| Método | Endpoint | Descrição | Sucesso |
|---|---|---|---|
| POST | `/cellphones/criar` | Cadastra um celular. | 201 |
| GET | `/cellphones/listar` | Lista todos os celulares. | 200 |
| GET | `/cellphones/listar/:id` | Busca um celular pelo ID. | 200 |
| PUT | `/cellphones/atualizar/:id` | Atualiza um celular. | 200 |
| DELETE | `/cellphones/deletar/:id` | Exclui um celular. | 204 |

### Exemplo de cadastro de celular

```json
{
  "marca": "Samsung",
  "modelo": "Galaxy S24",
  "cor": "Preto",
  "preco": 4499.90,
  "descricao": "Smartphone com 256 GB de armazenamento"
}
```

### Principais respostas de erro

| Status | Situação |
|---|---|
| 400 | Dados de usuário obrigatórios ausentes ou ID inválido. |
| 404 | Usuário ou celular não encontrado. |
| 500 | Falha interna ou erro de comunicação com o banco de dados. |

---

# PARTE 5: Front-end

## 9. Páginas

### Login - `/`

- Apresenta a identidade visual do catálogo.
- Permite informar e-mail e senha.
- Abre o formulário de criação de conta.
- Redireciona o usuário autenticado para o dashboard.

### Dashboard - `/dashboard`

- Exibe uma visão geral do sistema.
- Consulta a API e mostra a quantidade de celulares cadastrados.
- É acessível somente quando existe uma sessão local.

### Celulares - `/celulares`

- Lista os celulares em cards reutilizáveis.
- Permite abrir o modal de cadastro.
- Permite editar todos os dados do celular.
- Permite excluir um registro após confirmação.
- Exibe estados de carregamento, erro e catálogo vazio.

## 10. Componentes Principais

| Componente | Responsabilidade |
|---|---|
| `FormularioLogin` | Validação das credenciais e entrada no sistema. |
| `CriarUsuario` | Cadastro de usuário pela API. |
| `CardCelular` | Exibição de um celular e ações de editar e excluir. |
| `FormularioCelular` | Cadastro e edição de celulares. |
| `Modal` | Exibição dos formulários sobre a página atual. |
| `SideMenu` | Navegação entre dashboard, celulares e saída. |
| `PrivateRoute` | Bloqueio das páginas internas sem sessão. |

## 11. Integração com a API

O Axios está configurado em `frontend/src/services/api.js`.

A URL pode ser definida pela variável `VITE_API_URL`. Quando ela não é informada, o front-end utiliza:

```text
http://localhost:3000/api
```

---

# PARTE 6: Casos de Teste

## ENTREGA 08 - Descritivo de Casos de Teste

### 12.1 Casos de Teste de Usuários

| ID | Requisito | Descrição | Resultado Esperado |
|---|---|---|---|
| CT-01 | RF-01 | Cadastrar usuário com dados válidos. | Status 201 e usuário com ID. |
| CT-02 | RF-01 | Buscar usuário existente pelo ID. | Status 200 e dados correspondentes. |
| CT-03 | RF-01 | Buscar usuário inexistente. | Status 404. |
| CT-04 | RF-01 | Atualizar usuário existente. | Status 200 e dados atualizados. |
| CT-05 | RF-01 | Atualizar usuário inexistente. | Status 404. |
| CT-06 | RF-01 | Excluir usuário existente. | Status 204 e consulta posterior com 404. |
| CT-07 | RF-01 | Excluir usuário inexistente. | Status 404. |

### 12.2 Casos de Teste de Celulares

| ID | Requisito | Descrição | Resultado Esperado |
|---|---|---|---|
| CT-08 | RF-05 | Cadastrar celular com dados válidos. | Status 201 e celular com ID. |
| CT-09 | RF-08 | Buscar celular existente pelo ID. | Status 200 e dados correspondentes. |
| CT-10 | RF-08 | Buscar celular inexistente. | Status 404. |
| CT-11 | RF-06 | Atualizar celular, incluindo a descrição. | Status 200 e todos os campos atualizados. |
| CT-12 | RF-06 | Atualizar celular inexistente. | Status 404. |
| CT-13 | RF-07 | Excluir celular existente. | Status 204 e consulta posterior com 404. |
| CT-14 | RF-07 | Excluir celular inexistente. | Status 404. |

### 12.3 Teste de Ponta a Ponta

| ID | Requisitos | Descrição | Resultado Esperado |
|---|---|---|---|
| CT-15 | RF-01, RF-02 e RF-03 | Cadastrar um usuário, efetuar login e acessar o dashboard. | URL final `/dashboard` e título Dashboard visível. |

### Comandos de Teste

Na API:

```bash
cd api
npm test
```

No front-end:

```bash
cd frontend
npm run e2e
```

Os testes da API utilizam `pg-mem`, evitando alterações no banco PostgreSQL real durante a execução.

---

# PARTE 7: Ferramentas de Ambiente

## ENTREGA 09 - Dependências Principais

### API

| Ferramenta | Versão do projeto | Descrição |
|---|---|---|
| Node.js | Compatível com o projeto | Runtime JavaScript. |
| Express | ^4.17.1 | Servidor HTTP e rotas REST. |
| PostgreSQL | Banco relacional | Persistência dos dados. |
| pg | ^8.7.1 | Driver de conexão com PostgreSQL. |
| dotenv | ^10.0.0 | Carregamento de variáveis de ambiente. |
| cors | ^2.8.5 | Controle de origens permitidas. |
| Jest | ^29.6.1 | Testes automatizados. |
| Supertest | ^6.3.3 | Testes das rotas HTTP. |
| pg-mem | ^2.2.0 | PostgreSQL em memória para testes. |

### Front-end

| Ferramenta | Versão do projeto | Descrição |
|---|---|---|
| React | ^19.2.4 | Construção da interface. |
| Vite | ^8.0.4 | Ambiente de desenvolvimento e build. |
| React Router | ^7.14.0 | Controle de rotas. |
| Axios | ^1.14.0 | Comunicação com a API. |
| Tailwind CSS | ^4.2.2 | Estilização da interface. |
| React Toastify | ^11.0.5 | Mensagens de retorno ao usuário. |
| Playwright | ^1.60.0 | Testes de ponta a ponta. |

---

# PARTE 8: Instalação e Execução

## 13. Banco de Dados

1. Criar um banco PostgreSQL.
2. Executar o script `api/db/create_tables.sql`.
3. Criar o arquivo `api/.env` com as configurações locais.

Variáveis esperadas:

```env
DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=
JWT_SECRET=
PORT=3000
CORS_ORIGIN=
```

Não adicionar senhas reais ou outros dados secretos à documentação.

## 14. Iniciar a API

```bash
cd api
npm install
npm run dev
```

A API utiliza a porta definida em `PORT` ou a porta `3000` por padrão.

## 15. Iniciar o Front-end

```bash
cd frontend
npm install
npm run dev
```

Por padrão, o Vite disponibiliza a aplicação em `http://localhost:5173`.

---

# PARTE 9: Observações e Melhorias Futuras

## Estado Atual da Autenticação

O front-end realiza o login consultando a lista de usuários e comparando e-mail e senha. A sessão é mantida no `localStorage` e as páginas internas são protegidas pelo componente `PrivateRoute`.

Para um ambiente de produção, recomenda-se:

- Criar uma rota específica de login na API.
- Armazenar apenas o hash das senhas utilizando bcrypt.
- Não retornar senhas nas rotas de consulta de usuários.
- Emitir e validar tokens JWT nas rotas protegidas.
- Aplicar o middleware de autenticação aos endpoints privados.
- Validar os dados de celulares também no back-end.

## Resultado Atual

O sistema possui integração funcional entre front-end, API e PostgreSQL, com cadastro e login de usuários, catálogo completo de celulares, dashboard com total de registros e cobertura automatizada dos principais fluxos da API.
