---
sidebar_position: 1
id: intro
title: Introdução
tags:
  - routes
  - power-generated
---

# Energia Gerada

A rota de energia gerada é dividida em duas partes principais: endpoints de web scraping e endpoints de CRUD dos dados gerados.

## Web Scraping Endpoints

Usamos a biblioteca Puppeteer para fazer o web scraping dos inversores implementados na aplicação. Atualmente, temos dois endpoints de web scraping, um para os inversores da Huawei e outro para os da Elgin. Estes são os detalhes:

- `POST /power-generated/huawei-scraping`: Este endpoint faz o web scraping dos dados de um inversor Huawei. A Huawei fornece uma URL pública para cada inversor (que deve ser ativada nas configurações da Huawei), e essa URL deve ser fornecida no corpo da solicitação.

- `POST /power-generated/elgin-scraping`: Este endpoint faz o web scraping dos dados de um inversor Elgin. Como a Elgin requer login em sua plataforma para acessar os dados do inversor, as credenciais de login devem ser fornecidas no corpo da solicitação.

:::info

Os endpoints de web scraping são executados a cada 5 minutos usando um cron job para coletar automaticamente os dados mais recentes dos inversores.

:::

## Endpoints basicos

- `GET /power-generated`: Este endpoint retorna os dados de energia gerada. Ele aceita vários parâmetros para personalizar os dados retornados, como o ID do inversor, o intervalo de tempo e o tipo de dados. Se nenhum parâmetro for fornecido, ele retornará todos os dados disponíveis.

:::note

Lembre-se de que todos esses endpoints requerem autenticação. Portanto, certifique-se de incluir o token JWT no cabeçalho de autorização de suas solicitações.

:::
