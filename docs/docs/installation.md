---
sidebar_position: 2
id: installation
title: Instalação
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Instalação

Esta seção irá guiá-lo através da instalação e configuração do projeto Solar Power.

## Começando

Para começar, clone o repositório do **[Github](https://github.com/YasminCastro/solar-power)**.

### O que você vai precisar

- [Node.js](https://nodejs.org/en/download/)
- [Expo](#expo) ou [Android Studio](#android-studio)
- [Docker](https://www.docker.com)
- Arquivo **.env**

## Rodando o projeto

### Back-end

Para configurar o back-end do projeto, siga estes passos:

1. Dentro da pasta `backend`, instale as dependências:

<Tabs
defaultValue="npm"
values={[
{ label: 'Npm', value: 'npm' },
{ label: 'Yarn', value: 'yarn' },
]}>
<TabItem value="npm">

```powershell
npm install
```

</TabItem>
<TabItem value="yarn">

```powershell
yarn
```

</TabItem>
</Tabs>

2. Certifique-se de que o arquivo `.env.development.local` está na raiz da pasta backend. A backend deve rodar sempre na porta 4000.
3. Inicie o servidor de desenvolvimento:

<Tabs
defaultValue="npm"
values={[
{ label: 'Npm', value: 'npm' },
{ label: 'Yarn', value: 'yarn' },
]}>
<TabItem value="npm">

```powershell
npm run dev
```

</TabItem>
<TabItem value="yarn">

```powershell
yarn dev
```

</TabItem>
</Tabs>

### Front-end

1. Dentro da pasta front, instale as dependências utilizando o mesmo método descrito acima.
2. Inicie o servidor de desenvolvimento:

<Tabs
defaultValue="npm"
values={[
{ label: 'Npm', value: 'npm' },
{ label: 'Yarn', value: 'yarn' },
]}>
<TabItem value="npm">

```powershell
npm run start
```

</TabItem>
<TabItem value="yarn">

```powershell
yarn start
```

</TabItem>
</Tabs>

## Configurações

É possível utilizar tanto o Android Studio quanto o Expo para rodar o front-end do projeto. Porém recomendamos o Android Studio, por ser uma ferramenta mais estável que o Expo.

### Expo

1. Instale o [Expo](https://expo.dev/) no seu celular.
2. Rode o front-end do projeto como descrito acima.
3. Com [Expo](https://expo.dev/) aberto, escaneie o QR code gerado no terminal.

![Tutorial Expo](/img/intro/expo-tutorial.png)

4. Pronto! Agora o front-end está rodando no seu celular.

:::info
O front-end e o seu celular devem estar na mesma rede wi-fi.
:::

### Android Studio

1. Faça o download e a instale o [Android Studio](https://developer.android.com/studio).
2. Clique nas seguintes opções:
   ![Tutorial Android](/img/intro/android-studio-1.png)

3. Instale a versão 10.0 (Q) do Android:
   ![Tutorial Android](/img/intro/android-studio-2.png)

4. Em SDK Tools, instale as seguintes ferramentas e salve as configurações:
   ![Tutorial Android](/img/intro/android-studio-3.png)

5. Vá para a opção Virtual Device Manager:
   ![Tutorial Android](/img/intro/android-studio-4.png)

6. Crie um novo device, dê preferencia para o **Pixel 2**:
   ![Tutorial Android](/img/intro/android-studio-5.png)
7. Selecione a versão **Q** do Android:
   ![Tutorial Android](/img/intro/android-studio-6.png)

8. Salve tudo e inicie sua instancia do android:
   ![Tutorial Android](/img/intro/android-studio-7.png)

9. Rode o front-end do projeto como descrito acima e aperte a letra `a` no terminal para abrir o android:
   ![Tutorial Android](/img/intro/expo-tutorial.png)

```

```
