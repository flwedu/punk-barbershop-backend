# Mapeamento das rotas 🪧

Rotas cadastradas até o momento:

## Rotas de client

-   `GET` para `api/clients`:
    -   Retorna `200` e uma array todos os registros encontrados.
    -   Retorna `204` e uma array vazio caso nenhum registro seja encontrado.
-   `GET` para `api/clients/:id`:
    -   Retorna `200` e o registro encontrado para o `:id` informado.
    -   Retorna `404` caso nenhum registro seja encontrado.
-   `POST` para `api/clients`:
    -   Solicita a inserção de um registro.
    -   Dados do `body`:
        -   Campos obrigatórios:
            -   name: string
            -   birthDate: string de data no formato `ISO 8601` (YYYY-MM-DDTHH:mm:ss.sssZ)
            -   cpf: string
            -   email: string
        -   Campos opcionais:
            -   id: string
