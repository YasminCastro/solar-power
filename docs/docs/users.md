---
sidebar_position: 3
id: users
title: Usuários
tags:
  - routes
  - users
---

# Usuários

Nossa aplicação permite a gestão de usuários. Fornecemos vários endpoints para facilitar operações como busca, atualização e exclusão de usuários.

## Endpoints

- `GET /users`: Este endpoint retorna uma lista de todos os usuários. É útil quando você precisa de uma visão geral de todos os usuários registrados na aplicação.

- `GET /users/:id`: Este endpoint retorna os detalhes de um usuário específico. O parâmetro `:id` deve ser substituído pelo ID do usuário que você deseja buscar. Este endpoint é útil quando você precisa de informações detalhadas sobre um único usuário.

- `PUT /users/:id`: Este endpoint permite atualizar os detalhes de um usuário específico. O parâmetro `:id` deve ser substituído pelo ID do usuário que você deseja atualizar. O corpo da solicitação deve conter os detalhes atualizados do usuário.

- `DELETE /users/:id`: Este endpoint permite excluir um usuário específico. O parâmetro `:id` deve ser substituído pelo ID do usuário que você deseja excluir. Esteja ciente de que essa operação é irreversível.

:::note

Lembre-se de que todos esses endpoints requerem autenticação. Portanto, certifique-se de incluir o token JWT no cabeçalho de autorização de suas solicitações.

:::
