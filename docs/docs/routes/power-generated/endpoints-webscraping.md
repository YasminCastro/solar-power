---
sidebar_position: 2
id: endpoints-webscraping
title: Endpoints Web Scraping
description: Gerar por Web Scraping.
tags:
  - routes
  - power-generated
  - endpoint
  - hauwei
  - elgin
---

## POST /power-generated/hauwei

Este endpoint é usado para fazer webscrapping dos dados do inversor da hauwei.

### Request

#### Body

| Nome         | Tipo   | Descrição                       | Obrigatório |
| ------------ | ------ | ------------------------------- | ----------- |
| `url`        | string | A url dos dados Inversor        | Sim         |
| `lat`        | string | A latitude que o inversor está  | Sim         |
| `long`       | string | A longitude que o inversor está | Sim         |
| `long`       | string | A longitude que o inversor está | Sim         |
| `inversorId` | number | Id do inversor                  | Sim         |
| `userId`     | number | Id do usuário                   | Sim         |

### Response

#### Expected Body

```json
{
  "id": 5,
  "createdAt": "2023-05-02T22:44:05.580Z",
  "inversorId": 2,
  "userId": 1,
  "powerInRealTime": 0,
  "powerToday": 1140.32,
  "powerMonth": 2183.12,
  "powerYear": 109461.77,
  "allPower": 515811.99,
  "co2": 245.01,
  "coal": 206.32,
  "tree": 335,
  "lat": "-16.6254331",
  "long": "-49.2475725",
  "localtime": "2023-05-02 19:44",
  "tempC": 26,
  "windKph": 6.8,
  "pressureIn": 29.97,
  "humidity": 42,
  "cloud": 0,
  "uv": 1,
  "precipMM": 0
}
```

## POST /power-generated/elgin

Este endpoint é usado para fazer webscrapping dos dados do inversor da elgin.

### Request

#### Body

| Nome         | Tipo   | Descrição                                 | Obrigatório |
| ------------ | ------ | ----------------------------------------- | ----------- |
| `username`   | string | Usuário para logar na plataforma da Elgin | Sim         |
| `password`   | string | Senha para logar na plataforma da Elgin   | Sim         |
| `lat`        | string | A latitude que o inversor está            | Sim         |
| `long`       | string | A longitude que o inversor está           | Sim         |
| `long`       | string | A longitude que o inversor está           | Sim         |
| `inversorId` | number | Id do inversor                            | Sim         |
| `userId`     | number | Id do usuário                             | Sim         |

### Response

#### Expected Body

```json
{
  "id": 5,
  "createdAt": "2023-05-02T22:44:05.580Z",
  "inversorId": 2,
  "userId": 1,
  "powerInRealTime": 0,
  "powerToday": 1140.32,
  "powerMonth": 2183.12,
  "powerYear": 109461.77,
  "allPower": 515811.99,
  "co2": 245.01,
  "coal": 206.32,
  "tree": 335,
  "lat": "-16.6254331",
  "long": "-49.2475725",
  "localtime": "2023-05-02 19:44",
  "tempC": 26,
  "windKph": 6.8,
  "pressureIn": 29.97,
  "humidity": 42,
  "cloud": 0,
  "uv": 1,
  "precipMM": 0
}
```
