---
sidebar_position: 2
id: endpoints
title: Endpoints
description: Login e SignUp.
tags:
  - routes
  - auth
  - endpoint
---

## POST /auth/login

Este endpoint é usado para autenticar um usuário existente.

### Request

#### Body

| Nome       | Tipo   | Descrição          |
| ---------- | ------ | ------------------ |
| `email`    | string | O email do usuário |
| `password` | string | A senha do usuário |

### Response

#### Expected Body

```json
{
  "expiresIn": 604800,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

## POST /auth/signup

Este endpoint é usado para criar um novo usuário.

### Request

#### Body

| Nome       | Tipo   | Descrição          |
| ---------- | ------ | ------------------ |
| `name`     | string | O nome do usuário  |
| `email`    | string | O email do usuário |
| `password` | string | A senha do usuário |

### Response

#### Expected Body

```json
{
  "message": "User successfully created"
}
```
