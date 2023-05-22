---
sidebar_position: 1
id: endpoints
title: Endpoints
description: Login e SignUp.
tags:
  - routes
  - auth
  - endpoint
---

## GET /users/:id

Este endpoint é usado para encontrar um usuário existente.

### Response

#### Expected Body

```json
{
  "id": 1,
  "email": "yasmincastro@gmail.com",
  "name": "yasmin",
  "createdAt": "2023-05-02T19:03:33.987Z",
  "inversors": []
  "powerGenerated": []
}
```

## PUT /users/:id

Este endpoint é usado para atualizar um usuário existente.

### Request

#### Body

| Nome       | Tipo   | Descrição          |
| ---------- | ------ | ------------------ |
| `name`     | string | O nome do usuário  |
| `password` | string | A senha do usuário |

### Response

#### Expected Body

```json
{
  "message": "User successfully updated"
}
```

## DEL /users/:id

Este endpoint é usado para deletar um usuário existente.

### Response

#### Expected Body

```json
{
  "message": "User  successfully deleted"
}
```
