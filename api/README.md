# Catálogo de Celulares

Este projeto é uma API REST para um catálogo de celulares, desenvolvida em Node.js utilizando o framework Express e conectada ao banco de dados PostgreSQL. A arquitetura do projeto é baseada em camadas, garantindo a separação de responsabilidades.

## Estrutura do Projeto

```
catalogo-celulares
├── src
│   ├── config              # Configuração do Pool de conexão com o banco
│   ├── controllers         # Gerenciamento de requisições e respostas (HTTP)
│   ├── services            # Lógica de negócio e validações
│   ├── repositories        # Camada de persistência com queries SQL puras
│   ├── routes              # Definição de rotas para Usuários e Celulares
│   ├── middlewares         # Middleware para CORS e autenticação
│   ├── utils               # Funções utilitárias, como hashing de senhas
│   ├── app.js              # Inicialização da aplicação Express
│   └── server.js           # Início do servidor
├── db
│   └── create_tables.sql   # Script SQL para criação das tabelas
├── .env.example            # Template para variáveis de ambiente
├── .gitignore              # Arquivos e diretórios a serem ignorados pelo Git
├── package.json            # Configuração do npm
└── README.md               # Documentação do projeto
```

## Funcionalidades

- **CRUD completo para o catálogo de celulares**: Permite criar, ler, atualizar e deletar informações sobre celulares.
- **Cadastro de novos usuários**: Permite a criação de novos usuários com validação de dados e criptografia de senhas.
- **Configuração de CORS**: Permite a integração com o frontend.
- **Uso de um arquivo .env**: Para gerenciar credenciais do banco de dados de forma segura.

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/seu_usuario/catalogo-celulares.git
   cd catalogo-celulares
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Crie um arquivo `.env` baseado no `.env.example` e configure suas credenciais do banco de dados.

4. Execute o script SQL para criar as tabelas:
   ```
   psql -U seu_usuario -d seu_banco -f db/create_tables.sql
   ```

5. Inicie o servidor:
   ```
   npm start
   ```

## Uso

A API estará disponível em `http://localhost:3000`. Você pode usar ferramentas como Postman ou Insomnia para testar as rotas.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Faça um fork do repositório e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.