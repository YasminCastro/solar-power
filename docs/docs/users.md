---
sidebar_position: 4
id: users
title: Usuários
tags:
  - routes
  - users
---

# Usuários

Nossa aplicação permite a gestão de usuários. Fornecemos vários endpoints para facilitar operações como busca, atualização e exclusão de usuários.

## Endpoints

:::info

Antes de prosseguir, lembre-se de que todos esses endpoints requerem autenticação. É fundamental incluir o token JWT no cabeçalho de autorização (`Authorization: Bearer <token>`) em todas as suas solicitações.

:::

- [`GET /users`](/api/buscar-usuarios): Retorna uma lista de todos os usuários cadastrados na plataforma.
- [`GET /users/:id`](/api/buscar-usuario-por-id): Permite a busca de informações de um usuário específico, usando seu ID como parâmetro.
- [`PUT /users/:id`](/api/atualizar-usuario): Este endpoint é usado para atualizar os dados de um usuário específico.
- [`DELETE /users/:id`](/api/excluir-usuario): Remove um usuário específico da base de dados.

Para informações mais detalhadas, como parâmetros de requisição e exemplos de respostas, consulte nossa [Documentação das APIs](/api).
