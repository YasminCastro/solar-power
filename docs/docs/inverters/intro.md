---
sidebar_position: 1
id: intro
title: Introdução
tags:
  - routes
  - inverters
---

# Inversores

Nossa aplicação permite a gestão de inversores solares. Inversor de energia fotovoltaica, também conhecido como inversor solar, é um dispositivo que converte a energia do sol, captada pelos painéis solares, de corrente contínua (DC) para corrente alternada (AC). Esta é a forma de energia que usamos em nossas casas e empresas.

Fornecemos vários endpoints para facilitar operações como criação, busca, atualização e exclusão de inversores.

## Endpoints

- `POST /inverters`: Este endpoint permite criar um novo inversor. O corpo da solicitação deve conter os detalhes do inversor.

- `GET /inverters`: Este endpoint retorna os detalhes de um ou mais inversores. Ele aceita dois parâmetros opcionais, `userId` e `inverterId`. O parâmetro `userId` retorna todos os inversores de um usuário específico, enquanto o parâmetro `inverterId` retorna os detalhes de um inversor específico.

- `PUT /inverters/:id`: Este endpoint permite atualizar os detalhes de um inversor específico. O parâmetro `:id` deve ser substituído pelo ID do inversor que você deseja atualizar. O corpo da solicitação deve conter os detalhes atualizados do inversor.

- `DELETE /inverters/:id`: Este endpoint permite excluir um inversor específico. O parâmetro `:id` deve ser substituído pelo ID do inversor que você deseja excluir. Esteja ciente de que essa operação é irreversível.

:::note

Lembre-se de que todos esses endpoints requerem autenticação. Portanto, certifique-se de incluir o token JWT no cabeçalho de autorização de suas solicitações.

:::
