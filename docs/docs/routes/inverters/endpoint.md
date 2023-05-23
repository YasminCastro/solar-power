---
sidebar_position: 2
id: endpoints
title: Endpoints
description: Inversores.
tags:
  - routes
  - inversors
  - endpoint
---

## POST /inversors

Este endpoint é usado para criar um inversor.

### Request

#### Body

| Nome       | Tipo   | Descrição                       | Obrigatório |
| ---------- | ------ | ------------------------------- | ----------- |
| `name`     | string | O nome do Inversor              | Sim         |
| `model`    | string | O modelo do Inversor            | Sim         |
| `username` | string | O usuário de login do Inversor  | Não         |
| `password` | string | O usuário de login do Inversor  | Não         |
| `url`      | string | A url dos dados Inversor        | Não         |
| `cep`      | string | O CEP que o inversor está       | Sim         |
| `lat`      | string | A latitude que o inversor está  | Sim         |
| `long`     | string | A longitude que o inversor está | Sim         |

### Response

#### Expected Body

```json
{
  "message": "Inversor successfully created"
}
```

## GET /inversors/user/:id

Este endpoint é usado para buscar inversores do usuário.

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

## GET /inversors/:id

Este endpoint é usado para buscar um inversor por id.

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

## PUT /inversors/:id

Este endpoint é usado para atualizar um inversor.

### Request

#### Body

| Nome       | Tipo   | Descrição                       | Obrigatório |
| ---------- | ------ | ------------------------------- | ----------- |
| `name`     | string | O nome do Inversor              | Sim         |
| `model`    | string | O modelo do Inversor            | Sim         |
| `username` | string | O usuário de login do Inversor  | Não         |
| `password` | string | O usuário de login do Inversor  | Não         |
| `url`      | string | A url dos dados Inversor        | Não         |
| `cep`      | string | O CEP que o inversor está       | Sim         |
| `lat`      | string | A latitude que o inversor está  | Sim         |
| `long`     | string | A longitude que o inversor está | Sim         |

### Response

#### Expected Body

```json
{
  "inversor": {
    "id": 1,
    "createdAt": "2023-05-02T00:35:31.218Z",
    "name": "Casa glaucia",
    "userId": 2,
    "model": "elgin",
    "url": "https://la5.fusionsolar.huawei.com/pvmswebsite/nologin/assets/build/index.html#/kiosk?kk=c8G84jaHlgapefCwiO3spDcixh4dKQeI",
    "username": "Glaucia ravilla",
    "password": "menezes123"
  },
  "message": "User successfully updated"
}
```

## DEL /inversors/:id

Este endpoint é usado para deletar um inversor.

### Response

#### Expected Body

```json
{
  "message": "Inversor successfully deleted"
}
```
