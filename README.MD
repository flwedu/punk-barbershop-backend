# punk-barbershop-backend

<div display="inline-block" align="center">
<img src="https://user-images.githubusercontent.com/55285816/154165860-266d2e83-a65a-473b-b163-a111826db8e4.jpg" alt="punk barbershop logo" width="200px"/>
<br>
<img src="https://img.shields.io/github/last-commit/flwedu/punk-barbershop-backend" />
<img src="https://img.shields.io/github/repo-size/flwedu/punk-barbershop-backend" />
</div>

## Descrição do projeto

Essa aplicação backend foi criada para atender as demandas de uma barbearia, no agendamento de atendimentos, consulta de preços e acúmulo de pontos de fidelidade para o cliente.

O intuito principal foi aplicar alguns conceitos aprendidos durante os estudos de Domain Driven Design, Test Driven Design, Clean Architecture e uso de Node.js no backend para construção de Rest API's.

<div display="inline-block" align="center">

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

## Realizando build da aplicação

Scripts para execução da aplicação:

```bash
# Para rodar em modo de desenvolvimento (jeito mais rápido)
npm run dev

# Caso deseje gerar um build
npm run build

# Após o build, a aplicação pode ser executada em:
node build/main/app.js
```

O arquivo `.env` na raiz do projeto contém configurações de conexão com o banco de dados mongoDB.
Altere de acordo com a necessidade.

A API estará disponível por padrão em [http://localhost:3000/api]([http://localhost:3000/api).

## Testando a aplicação

Para executar os testes e ver as informações de coverage:

```bash
npm run test
```

## Tecnologias utilizadas

- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Jest](https://jestjs.io/)
- [MongoDB](https://www.mongodb.com/)

## Metodologias praticadas

- TDD (Test Driven Development)
- DDD (Domain Driven Design)
- Clean Architecture
- SOLID

## Documentação do projeto

- [REQUIREMENTS.MD](docs/REQUIREMENTS.MD): Requisitos / regras de negócio.
- [diagram.png](docs/diagram.png): Diagrama de relacionamento entre componentes.
- [ROUTES.MD](docs/ROUTES.MD): Mapeamento de rotas / requisições cadastradas até o momento.
