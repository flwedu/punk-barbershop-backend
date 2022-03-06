# Mapeamento das rotas 🪧

Rotas cadastradas até o momento:

## Rotas de client

### `GET` para `api/clients`:

-   Retorna `200` e uma array todos os registros encontrados.
-   Retorna `204` e uma array vazio caso nenhum registro seja encontrado.

### `GET` para `api/clients/:id`:

-   Retorna `200` e o registro encontrado para o `:id` informado.
-   Retorna `404` caso nenhum registro seja encontrado.

### `POST` para `api/clients`:

Solicita a inserção de um registro.

Dados do `body`:

|   Campo   |                             Tipo                             | Obrigatório? |
| :-------: | :----------------------------------------------------------: | :----------: |
|    id     |                            string                            |     Não      |
|   name    |                            string                            |     Sim      |
| birthDate | string de data formato `ISO 8601` (YYYY-MM-DDTHH:mm:ss.sssZ) |     Sim      |
|    cpf    |                            string                            |     Sim      |
|   email   |                            string                            |     Sim      |

-   Retorna `201` para um registro inserido com sucesso.
-   Retorna `400` para algum erro de regra de negócio
-   Retorna `500` para erro de servidor
