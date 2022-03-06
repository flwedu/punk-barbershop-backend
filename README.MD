# punk-barbershop-backend

<img src="https://user-images.githubusercontent.com/55285816/154165860-266d2e83-a65a-473b-b163-a111826db8e4.jpg" alt="punk barbershop logo" width="200px" style="margin-left: 35%" />

## Descrição do projeto

Essa aplicação backend foi criada para atender as demandas de uma barbearia, no agendamento de atendimentos, consulta de preços e acúmulo de pontos de fidelidade para o cliente.

O intuito principal foi aplicar alguns conceitos aprendidos durante os estudos de Domain Driven Design, Test Driven Design, Clean Architecture e uso de Node.js no backend para construção de Rest APIS.

## Realizando build da aplicação

Para executar a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

A aplicação rodará por padrão em [http://localhost:3000/api]([http://localhost:3000/api).

Caso deseje realizar um build, execute:

```bash
npm run build
```

Será criada uma pasta `build` com os arquivos transpilados para `.js`.

Após o build, basta executar o arquivo `build/main/app.js`, com o comando

```bash
node build/main/app.js
```

## Testando a aplicação

Para executar testes:

```bash
npm run test
```

## Tecnologias utilizadas

-   Javascript
-   Typescript
-   Node.js
-   Express
-   Jest
-   SQLite

## Metodologias praticadas

-   TDD (Test Driven Development)
-   DDD (Domain Driven Design)
-   Clean Architecture
-   SOLID

## Documentação do projeto

-   Requisitos / regras de negócio: [REQUIREMENTS.MD](docs/REQUIREMENTS.MD).
-   Diagrama de relacionamento entre componentes: [diagram.png](docs/diagram.png)
-   Mapeamento de rotas / requisições: [ROUTES.MD](docs/ROUTES.MD)
