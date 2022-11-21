# NG.Cash - Backend

Este é um projeto onde foi contruído uma API de um app de transações bancárias.

## Documentação Postman:

https://documenter.getpostman.com/view/19301541/2s8YmUKyqv

## Como rodar o projeto:

O projeto esta upado no heroku, então você pode fazer todas as requisições com as rotas especificadas na documentação através do API Client que preferir.

Porém, se quiser rodar o projeto localmente, certifique-se de rodar:

- npm install
- npm run dev

## Requisitos:

Todos os requisitos foram cumpridos com sucesso. O código foi feito em Node.js + TypeScript, utilizei o PRISMA como ORM e foi usado o PostgreSQL como banco de dados.

Todas as regras de negócio foram levadas em consideração e <TODAS> elas também foram cumpridas. Adicionei algumas regras de negócio a mais, deixando o tratamento de erros ainda mais seguro.

## Ferramentas utilizadas:

- Node.js
- TypeScript
- PostgreSQL
- PRISMA
- Jest
- Json Web Token
- Bcrypt

## Extras:

Resolvi fazer uns endpoints adicionais no código, um CRUD pro usuário e um endpoint para adicionar mais balance (saldo) na conta.

Também fiz uma bateria de testes unitários para o tratamento de erros do business com mock automático do jest.

Para rodar os test:

- npm run test

## Desenvolvido por:

email: paulotarsogl@gmail.com
