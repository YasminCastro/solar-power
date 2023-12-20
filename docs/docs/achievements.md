---
sidebar_position: 8
id: achievements
title: Conquistas
tags:
  - routes
  - achievements
---

Os endpoints de conquistas permitem aos usuários acompanhar e gerenciar suas conquistas pessoais relacionadas ao uso eficiente de energia solar.

## Endpoints de Conquistas

:::info

Antes de prosseguir, lembre-se de que todos esses endpoints requerem autenticação. É fundamental incluir o token JWT no cabeçalho de autorização (`Authorization: Bearer <token>`) em todas as suas solicitações.

:::

- [`GET /achievements`](/api/buscar-conquistas): Lista todas as conquistas disponíveis.
- [`GET /achievements/:userId`](/api/buscar-conquista-por-id): Lista as conquistas alcançadas por um usuário específico.
- [`POST /achievements`](/api/criar-conquista): Cria uma nova conquista no sistema.
- [`PUT  /achievements/:id`](/api/atualizar-conquistas): Atualiza informações de uma conquista específica.
- [`DELETE  /achievements/:id`](/api/excluir-conquista): Remove uma conquista do sistema.

Para informações mais detalhadas, como parâmetros de requisição e exemplos de respostas, consulte nossa [Documentação das APIs](/api).
