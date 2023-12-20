---
sidebar_position: 4
id: users
title: Usuários
tags:
  - routes
  - users
---

# Usuários

A aplicação permite a gestão de usuários. Fornecemos vários endpoints para facilitar operações como busca, atualização e exclusão de usuários.

## Endpoints

:::info

Antes de prosseguir, lembre-se de que todos esses endpoints requerem autenticação. É fundamental incluir o token JWT no cabeçalho de autorização (`Authorization: Bearer <token>`) em todas as suas solicitações.

:::

- [`GET /users`](/api/buscar-usuarios): Busca todos os usuários cadastrados.
- [`GET /users/:id`](/api/buscar-usuario-por-id): Busca um usuário pelo ID.
- [`PUT /users/:id`](/api/atualizar-usuario): Atualiza dados de um usuário específico.
- [`DELETE /users/:id`](/api/excluir-usuario): Exclui um usuário pelo ID.
- [`GET /users/ranking`](/api/ranking-de-usuarios): Exibe o ranking de todos os usuários.
- [`GET /users/ranking/:id`](/api/buscar-ranking-do-usuario-por-id): Mostra o ranking em torno de um usuário específico.

Para informações mais detalhadas, como parâmetros de requisição e exemplos de respostas, consulte nossa [Documentação das APIs](/api).
