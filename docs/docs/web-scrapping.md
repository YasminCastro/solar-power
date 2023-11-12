---
sidebar_position: 6
id: web-scrapping
title: Web Scrapping
tags:
  - routes
  - power-generated
  - calculate-real-time-power
---

# Energia Gerada

A rota de energia gerada é dividida em duas partes principais: endpoints de web scraping e endpoints de CRUD dos dados gerados.

## Função para descobrir a geração de energia em tempo real

Em alguns sistemas de monitoramento de inversores de energia solar não fornecer a métrica de "Potência em tempo real (kW)", que indica a geração de energia no momento atual. Esta informação é crucial para monitorar o desempenho em tempo real do sistema e fazer ajustes conforme necessário.

Para resolver este problema, foi necessário criar uma função ou algoritmo que pudesse calcular uma aproximação da geração de energia em tempo real com base nas "Potência gerada durante o dia (kWh)".

A função é executada a cada 5 minutos e realiza os seguintes passos:

1. Obtém o valor atual do "Rendimento do dia atual (kWh)".
2. Obtém o valor do "Rendimento do dia atual (kWh)" de 5 minutos atrás.
3. Calcula a diferença entre os dois valores, o que fornece a quantidade de energia gerada nos últimos 5 minutos.
4. Divide essa quantidade de energia pelo tempo decorrido (5 minutos, ou 1/12 de uma hora), para obter a potência média durante esse período em kilowatts (kW).

Assim, a função fornece uma estimativa da geração de energia em tempo real. Vale ressaltar que esta é uma aproximação que assume que a geração de energia foi constante durante o intervalo de 5 minutos. Se a geração de energia variar significativamente durante esse período, a estimativa pode não ser perfeitamente precisa. No entanto, em geral, essa aproximação deve fornecer uma boa indicação do desempenho em tempo real do sistema.

```typescript
  public async calculateRealTimePower(inversorId: number, nowEnergy: number): Promise<number> {
    try {
      const previousEnergyFound: PowerGenerated = await this.powerGenerated.findFirst({
        where: { inversorId },
        orderBy: { createdAt: 'desc' },
      });

      if (!previousEnergyFound) return null;

      const previousEnergy = parseFloat(previousEnergyFound.powerToday);

      const power = (nowEnergy - previousEnergy) / (1 / 12);
      return power;
    } catch (error: any) {
      logger.error(`Not able to calculate power: ${error.message}`);
      throw new HttpException(400, error.message);
    }
  }

```

## Web Scraping Endpoints

Usamos a biblioteca Puppeteer para fazer o web scraping dos inversores implementados na aplicação. Atualmente, temos dois endpoints de web scraping, um para os inversores da Huawei e outro para os da Elgin. Estes são os detalhes:

- `POST /power-generated/huawei-scraping`: Este endpoint faz o web scraping dos dados de um inversor Huawei. A Huawei fornece uma URL pública para cada inversor (que deve ser ativada nas configurações da Huawei), e essa URL deve ser fornecida no corpo da solicitação.

- `POST /power-generated/elgin-scraping`: Este endpoint faz o web scraping dos dados de um inversor Elgin. Como a Elgin requer login em sua plataforma para acessar os dados do inversor, as credenciais de login devem ser fornecidas no corpo da solicitação.

:::info

Os endpoints de web scraping são executados a cada 5 minutos usando um cron job para coletar automaticamente os dados mais recentes dos inversores.

:::

## Endpoints basicos

- `GET /power-generated`: Este endpoint retorna os dados de energia gerada. Ele aceita vários parâmetros para personalizar os dados retornados, como o ID do inversor, o intervalo de tempo e o tipo de dados. Se nenhum parâmetro for fornecido, ele retornará todos os dados disponíveis.

:::note

Lembre-se de que todos esses endpoints requerem autenticação. Portanto, certifique-se de incluir o token JWT no cabeçalho de autorização de suas solicitações.

:::
