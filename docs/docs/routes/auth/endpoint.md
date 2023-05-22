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

## POST /auth/login

Este endpoint é usado para autenticar um usuário existente.

### Request

#### Body

| Nome       | Tipo   | Descrição          |
| ---------- | ------ | ------------------ |
| `email`    | string | O email do usuário |
| `password` | string | A senha do usuário |

### Response

#### Body

| Nome        | Tipo   | Descrição                   |
| ----------- | ------ | --------------------------- |
| `token`     | string | Token JWT para autenticação |
| `expiresIn` | number | Tempo de duração do token   |

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

#### Body

| Nome      | Tipo   | Descrição                 |
| --------- | ------ | ------------------------- |
| `message` | string | User successfully created |
