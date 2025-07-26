Claro! Aqui está o conteúdo formatado em Markdown para o seu README:

````markdown
#  🧑🏿‍💻Usuários API

API REST para cadastro, login e gerenciamento de usuários com autenticação JWT.

## Tecnologias

- Node.js
- Express
- JWT para autenticação
- bcrypt para hash de senhas
- SQLite/PostgreSQL (ou outro banco que usar)
- Swagger para documentação da API

## Funcionalidades

- Cadastro de usuários
- Login com geração de token JWT
- Validação e tratamento de erros
- Proteção de rotas privadas via JWT

## Como rodar o projeto

1. Clone o repositório  
```bash
git clone https://github.com/seu-usuario/usuarios-api.git
````

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto, exemplo:

```
PORT=3000
JWT_SECRET=sua_chave_secreta
DATABASE_URL=...
```

4. Inicie o servidor

```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## Documentação da API

A API está documentada com Swagger e pode ser acessada em:
`http://localhost:3000/api-docs`

## Endpoints principais

| Método | Rota      | Descrição                    |
| ------ | --------- | ---------------------------- |
| POST   | /register | Cadastro de usuário          |
| POST   | /login    | Login e obtenção do JWT      |
| GET    | /profile  | Dados do usuário (protegida) |

## Testes

Use o Swagger UI ou ferramentas como Postman para testar os endpoints.

## Boas práticas

* Nunca versionar arquivos `.env`
* Usar `bcrypt` para salvar senhas com hash
* Proteger rotas privadas com middleware de autenticação JWT
* Validar dados enviados pelo cliente para evitar erros e ataques




