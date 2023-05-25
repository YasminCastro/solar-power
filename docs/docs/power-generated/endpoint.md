---
sidebar_position: 3
id: endpoints
title: Endpoints
description: Busca de dados gerados.
tags:
  - routes
  - power-generated
  - endpoint
  - hauwei
  - elgin
---

## GET /power-generated

Este endpoint é usado para buscar os dados gerados.

### Request

#### Params

| Nome         | Descrição                         | Obrigatório |
| ------------ | --------------------------------- | ----------- |
| `userId`     | O id do Usuario                   | Sim         |
| `inversorId` | O id do inversor.                 | Não         |
| `limit`      | Total de dados que quer retornar. | Não         |

:::info

Os dados virão por ordem de mais novo para mais antigo.

:::

### Response

#### Expected Body

```json
[
  {
    "id": 1103,
    "createdAt": "2023-05-25T19:45:07.413Z",
    "inversorId": 2,
    "userId": 1,
    "powerInRealTime": 53.92,
    "powerToday": 868.87,
    "powerMonth": 25.08,
    "powerYear": 132.36,
    "allPower": 538.71,
    "co2": 255.89,
    "coal": 215.48,
    "tree": 350,
    "lat": "-16.6254331",
    "long": "-49.2475725",
    "localtime": "2023-05-25 16:45",
    "tempC": 29,
    "windKph": 9,
    "pressureIn": 30.03,
    "humidity": 40,
    "cloud": 0,
    "uv": 7,
    "precipMM": 0
  }
]
```
