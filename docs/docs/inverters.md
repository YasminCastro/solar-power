---
sidebar_position: 5
id: inverters
title: Inversores
tags:
  - routes
  - inverters
---

# Inversores

Os inversores são componentes cruciais em sistemas de energia solar, convertendo energia solar de corrente contínua (DC) em corrente alternada (AC), a forma de energia utilizada em residências e empresas. A nossa aplicação facilita a gestão desses inversores solares, permitindo operações como criação, busca, atualização e exclusão.

## Endpoints

:::info

Antes de prosseguir, lembre-se de que todos esses endpoints requerem autenticação. É fundamental incluir o token JWT no cabeçalho de autorização (`Authorization: Bearer <token>`) em todas as suas solicitações.

:::

- [`POST /inverters`](/api/criar-inversor): Cria um inversor.
- [`GET /inverters`](/api/buscar-inversores): Lista todos os inversores cadastrados.
- [`GET /inverters/inverter/:inverterId`](/api/buscar-inversor-por-id): Busca um inversor pelo ID.
- [`GET /inverters/user/:userId`](/api/buscar-inversores-por-usuario): Lista inversores de um usuário específico.
- [`PUT /inverters/:id`](/api/atualizar-inversor): Atualiza um inversor específico.
- [`DELETE /inverters/:id`](/api/excluir-inversor): Remove um inversor.

Para informações mais detalhadas, como parâmetros de requisição e exemplos de respostas, consulte nossa [Documentação das APIs](/api).
