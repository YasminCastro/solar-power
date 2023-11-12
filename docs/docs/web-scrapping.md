---
sidebar_position: 6
id: web-scrapping
title: Web Scrapping
tags:
  - routes
  - power-generated
---

A funcionalidade de web scraping da nossa aplicação é usada para coletar dados de inversores solares de diferentes fabricantes. Utilizamos a biblioteca Puppeteer para realizar o web scraping de maneira eficiente e segura.

## Endpoints

:::info

Antes de prosseguir, lembre-se de que todos esses endpoints requerem autenticação. É fundamental incluir o token JWT no cabeçalho de autorização (`Authorization: Bearer <token>`) em todas as suas solicitações.

:::

Usamos a biblioteca Puppeteer para fazer o web scraping dos inversores implementados na aplicação. Atualmente, temos dois endpoints de web scraping, um para os inversores da Huawei e outro para os da Elgin. Estes são os detalhes:

- [`GET /power-generated/huawei`](/api/iniciar-web-scraping-para-inversor-huawei): Coleta dados de inversores Huawei.

- [`GET /power-generated/elgin`](/api/iniciar-web-scraping-para-inversor-elgin): Coleta dados de inversores Elgin.

Para informações mais detalhadas, como parâmetros de requisição e exemplos de respostas, consulte nossa [Documentação das APIs](/api).
