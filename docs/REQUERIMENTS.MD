# Requisitos Funcionais

-   As entidades são:

    -   Client: Representa um cliente.
    -   Barber: Representa um cabelereiro (barberiro).
    -   Scheduling: Representa um agendamento.
    -   ServiceType: Representa um tipo de serviço.

-   Todas as entidades devem possuir um id.
-   Propriedades de cada entidade:
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

## Regras de negócio

-   Um agendamento deve possuir: um único cliente, um único barbeiro e um único tipo de serviço.
-   Um barbeiro não pode possuir dois agendamentos para um mesmo horário.
-   Um cliente não pode possuir dois agendamentos para um mesmo horário.
