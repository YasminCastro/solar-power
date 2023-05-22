---
sidebar_position: 2
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
| `type`       | Busca por inversor ou por usuário | Sim         |
| `inversorId` | A url dos dados Inversor.         | Sim         |
| `userId`     | A latitude que o inversor está.   | Sim         |
| `limit`      | Total de dados que quer retornar. | Não         |
| `date`       | Data que o dado foi gerado.       | Não         |

### Response

#### Expected Body

```json
[
  {
    "id": 1,
    "createdAt": "2023-05-02T19:03:50.787Z",
    "userId": 1,
    "name": "teste",
    "model": "elgin",
    "url": null,
    "username": "Glaucia ravilla",
    "password": "U2FsdGVkX18n7PLDMfn0aiu9i6xzXBy0irTIn/jOBYM=",
    "active": true,
    "cep": "74663370",
    "lat": "-16.6254331",
    "long": "-49.2475725"
  }
]
```
