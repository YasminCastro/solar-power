---
sidebar_position: 8
id: achivements
title: Conquistas
tags:
  - routes
  - achivements
---

Os endpoints relacionados à energia gerada permitem acessar dados sobre a quantidade de energia gerada pelos inversores em diferentes intervalos de tempo.

## Endpoints Geração de Energia

:::info

Antes de prosseguir, lembre-se de que todos esses endpoints requerem autenticação. É fundamental incluir o token JWT no cabeçalho de autorização (`Authorization: Bearer <token>`) em todas as suas solicitações.

:::

- [`GET /power-generated/real-time/:inverterId`](/api/obter-dados-de-geracao-de-energia-em-tempo-real): Retorna dados em tempo real de um inversor específico.
- [`GET /power-generated/day/:inverterId`](/api/obter-dados-de-geracao-de-energia-diaria): Retorna dados diários de um inversor específico.
- [`GET /power-generated/month/:inverterId`](/api/obter-dados-de-geracao-de-energia-mensal): Retorna dados mensais de um inversor específico.
- [`GET /power-generated/year/:inverterId`](/api/obter-dados-de-geracao-de-energia-anual): Retorna dados em anuais de um inversor específico.

Para informações mais detalhadas, como parâmetros de requisição e exemplos de respostas, consulte nossa [Documentação das APIs](/api).
