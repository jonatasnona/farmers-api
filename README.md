# Farmers API

API para cadastro de produtores rurais.

## Requisitos

- **Node.js** >= 22
- **PostgreSQL**
- **Docker** (opcional)
- **Docker Compose** (opcional)

## Configuração do Ambiente

Antes de rodar o projeto, é necessário criar um arquivo `.env` baseado no `.env.example`. Abaixo estão os valores recomendados para desenvolvimento:

```env
# Database
DATABASE_HOST=localhost
DATABASE_NAME=farmers
DATABASE_USER=postgres
DATABASE_PASS=postgres

# Application
APP_PORT=3000
```

Se for utilizar **Docker Compose** para subir tanto o banco de dados como a api, altere a variável `DATABASE_HOST` para `postgres`:

```env
DATABASE_HOST=postgres
```

## Rodando o PostgreSQL com Docker

Caso queira rodar apenas o serviço do **PostgreSQL** com Docker, execute:

```sh
docker compose up -d postgres
```

## Rodando o Projeto com Docker Compose

Para subir o projeto completo (api + banco de dados), execute:

```sh
docker compose up
```

## Rodando o Projeto Localmente

1. Instale as dependências:

```sh
yarn install
```

2. Inicie o servidor:

```sh
yarn start:dev
```

A API estará disponível em: `http://localhost:3000`

## Testes

### Rodando os Testes Unitários

```sh
yarn test
```

### Rodando os Testes E2E

```sh
yarn test:e2e
```

## Endpoints

A documentação completa dos endpoints pode ser encontrada via Swagger, acessando:

```
http://localhost:3000/api
```

## Exemplo de Cadastro de Farmer

### Body (JSON)

```json
{
  "document": "12345678901",
  "name": "João da Silva",
  "farmName": "Fazenda Boa Esperança",
  "city": "Goiânia",
  "state": "GO",
  "totalArea": 1000,
  "arableArea": 600,
  "vegetationArea": 400,
  "crops": ["Soja", "Milho"]
}
```

### Curl para Cadastro

```sh
curl -X POST http://localhost:3000/farmers \
  -H "Content-Type: application/json" \
  -d '{
    "document": "12345678901",
    "name": "João da Silva",
    "farmName": "Fazenda Boa Esperança",
    "city": "Goiânia",
    "state": "GO",
    "totalArea": 1000,
    "arableArea": 600,
    "vegetationArea": 400,
    "crops": ["Soja", "Milho"]
  }'
```
