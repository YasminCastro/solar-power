---
sidebar_position: 2
id: auth
title: Autenticação
tags:
  - routes
  - auth
---

# Autenticação

A autenticação é um aspecto crucial da nossa aplicação. Utilizamos o JSON Web Token (JWT) para autenticar os usuários. O JWT é um padrão (RFC-7519) que define como transmitir informações seguras entre partes usando um token. Essas informações são verificadas e confiáveis porque são assinadas digitalmente.

## JSON Web Token (JWT)

Quando um usuário se autentica com sucesso (através dos endpoints de login ou signup), um token JWT é gerado e retornado para o usuário. Este token deve ser incluído no cabeçalho de autorização de todas as solicitações subsequentes para endpoints protegidos. O formato do cabeçalho de autorização deve ser:

`Authorization: Bearer <token>`

Onde `<token>` é o token JWT recebido durante a autenticação.

## Bcrypt

Usamos o Bcrypt para fazer o hash das senhas dos usuários antes de armazená-las no banco de dados. O Bcrypt é uma função de hash de senha baseada no Blowfish. Ele incorpora um salt (um valor aleatório usado como entrada adicional) para proteger contra ataques de tabela de arco-íris e força bruta.

## Endpoints

- `POST /auth/login`: Endpoint para autenticar um usuário existente.
- `POST /auth/signup`: Endpoint para registrar um novo usuário.
