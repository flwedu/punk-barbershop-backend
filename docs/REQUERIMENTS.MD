# Descrição do domain

As entidades do `domain` são:
| Nome | Descrição |
| :--------: | :--------: |
Client | Representa um cliente.
Barber | Representa um cabelereiro.
Scheduling | Representa um agendamento.
ServiceType | Representa um tipo de serviço.

Propriedades de cada entidade:

-   Client:
    -   name
    -   email
    -   birthDate: data de nascimento
    -   cpf
    -   createdAt: data de cadastro
-   Barber:
    -   name
    -   email
    -   birthDate
    -   cpf / cnpj
    -   createdAt
-   Scheduling
    -   clientId: id do cliente que criou o agendamento
    -   barberId: id do barbeiro escolhido
    -   schedulingDateTime: data e horário do agendamento
    -   createdAt
-   ServiceType
    -   name
    -   description
    -   price: preço do serviço
    -   duration: duração do serviço

# Requisitos Funcionais

## Regras de negócio

Legenda:

-   ✔️ implementado
-   🤞 a ser implementado

| Situação |                                            Regra                                             |
| :------: | :------------------------------------------------------------------------------------------: |
|    ✔️    |                           Todas as entidades devem possuir um id.                            |
|    ✔️    | Um agendamento deve possuir: um único cliente, um único barbeiro e um único tipo de serviço. |
|    🤞    |            Um barbeiro não pode possuir dois agendamentos para um mesmo horário.             |
|    🤞    |             Um cliente não pode possuir dois agendamentos para um mesmo horário.             |
|          |                                                                                              |
