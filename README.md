# MiniTables Pokémon API

## Integrantes

| Nome | RA | Email |
|---|---|---|
| Emilly Damasceno Walter | 2539233 | emillyw@alunos.utfpr.edu.br |
| Emanuel Alves de Souza | 2539217 | manuzin081922@gmail.com |

---

# Sobre o Projeto

O **MiniTables Pokémon API** é uma aplicação backend desenvolvida para gerenciamento de informações relacionadas ao universo Pokémon.

O domínio escolhido foi Pokémon devido à possibilidade de representar diferentes entidades e relacionamentos dentro de um banco de dados relacional, permitindo aplicar conceitos fundamentais de arquitetura de software, como:

- Separação de responsabilidades;
- Orientação a objetos;
- Injeção de dependência;
- Organização em arquitetura Vertical Slice;
- Padrão Repository;
- Camada de Services;
- Tratamento centralizado de erros;
- Documentação utilizando Swagger/OpenAPI.

O projeto foi desenvolvido como uma API REST utilizando **Node.js**, **Fastify** e **PostgreSQL**, com banco hospedado utilizando a plataforma **Neon Database**.

---

# Objetivo do Projeto

O objetivo principal é desenvolver uma API organizada e escalável capaz de realizar operações CRUD completas sobre as entidades:

- Pokémon;
- Treinador;
- Tipo;
- Pokédex.

Além disso, o projeto contempla:

- Regras de negócio implementadas na camada Service;
- Consultas relacionais utilizando banco de dados;
- Tratamento global de erros;
- Documentação automática da API;
- Estrutura preparada seguindo padrões utilizados no mercado.

---

# Tecnologias Utilizadas

## Backend

- Node.js
- Fastify
- PostgreSQL
- Neon Database
- pg (node-postgres)

## Arquitetura e padrões

- Vertical Slice Architecture
- Repository Pattern
- Service Layer
- Dependency Injection
- Object-Oriented Programming

## Documentação

- OpenAPI
- Swagger
- @fastify/swagger
- @fastify/swagger-ui

---

# Estrutura do Projeto

```text
MiniTables-
│
├── src
│   │
│   ├── features
│   │   │
│   │   ├── Pokemon
│   │   │   ├── pokemon.controller.js
│   │   │   ├── pokemon.repository.js
│   │   │   ├── pokemon.routes.js
│   │   │   └── pokemon.service.js
│   │   │
│   │   ├── Treinador
│   │   │   ├── treinador.controller.js
│   │   │   ├── treinador.repository.js
│   │   │   ├── treinador.routes.js
│   │   │   └── treinador.service.js
│   │   │
│   │   ├── Tipo
│   │   │   ├── tipo.controller.js
│   │   │   ├── tipo.repository.js
│   │   │   ├── tipo.routes.js
│   │   │   └── tipo.service.js
│   │   │
│   │   └── Pokedex
│   │       ├── pokedex.controller.js
│   │       ├── pokedex.repository.js
│   │       ├── pokedex.routes.js
│   │       └── pokedex.service.js
│   │
│   ├── Error
│   │   └── AppError.js
│   │
│   ├── database.js
│   └── server.js
│
├── database.sql
├── .env
├── package.json
└── README.md

# Arquitetura da Aplicação

A aplicação segue uma arquitetura baseada em camadas:

```text
Cliente
   |
   ↓
Routes
   |
   ↓
Controller
   |
   ↓
Service
   |
   ↓
Repository
   |
   ↓
Banco de Dados
```

---

# Organização das Responsabilidades

## Routes

Responsáveis por:

- Definir os endpoints;
- Receber as requisições HTTP;
- Encaminhar chamadas para os Controllers.

Exemplo:

```text
GET /pokemon
POST /pokemon
DELETE /pokemon/:id
```

---

## Controller

Responsável pela comunicação entre HTTP e a aplicação.

Funções:

- Receber dados da requisição;
- Chamar o Service correto;
- Retornar respostas HTTP.

O Controller não possui regras de negócio, sendo responsável apenas pelo gerenciamento da comunicação entre a API e o cliente.

---

## Service

Responsável pelas regras de negócio da aplicação.

Exemplos:

- Verificar existência de treinador antes de criar um Pokémon;
- Validar informações recebidas;
- Controlar regras relacionadas às entidades.

O Service também realiza a comunicação com múltiplos repositories quando necessário, garantindo que as regras da aplicação permaneçam centralizadas.

---

## Repository

Responsável exclusivamente pelo acesso ao banco de dados.

Funções:

- Executar comandos SQL;
- Buscar informações;
- Inserir registros;
- Atualizar dados;
- Remover registros.

O Repository não possui regras de negócio, apenas realiza a comunicação direta com o banco.

---

# Banco de Dados

O banco foi modelado utilizando PostgreSQL.

As principais entidades são:

---

# Treinador

Representa os treinadores responsáveis pelos Pokémon.

## Campos principais:

- id_treinador
- nome
- idade

## Relacionamentos:

- Um treinador pode possuir vários Pokémon (1:N);
- Um treinador possui uma Pokédex (1:1).

---

# Pokémon

Representa os Pokémon cadastrados.

## Campos principais:

- id_pokemon
- nome
- nível
- id_treinador

## Relacionamentos:

- Cada Pokémon pertence a um treinador;
- Pokémon possui relação N:N com Tipo.

---

# Tipo

Representa os tipos dos Pokémon.

## Exemplos:

- Fogo;
- Água;
- Elétrico;
- Pedra;
- Voador.

---

# Pokédex

Representa a coleção individual de cada treinador.

## Relacionamento:

- Um treinador possui uma única Pokédex (1:1).

---

# Pokemon_Tipo

Tabela associativa responsável pelo relacionamento:

```text
Pokémon N:N Tipo
```

Ela permite que:

- Um Pokémon possua vários tipos;
- Um tipo pertença a vários Pokémon.

---

# Tratamento de Erros

A aplicação possui tratamento centralizado utilizando a classe:

```text
AppError
```

Exemplo:

```javascript
throw new AppError(
    "Pokémon não encontrado",
    404
);
```

Todos os erros são tratados pelo:

```javascript
server.setErrorHandler()
```

do Fastify.

Os retornos seguem o padrão:

```json
{
    "status": "error",
    "message": "Mensagem do erro"
}
```

---

# Documentação Swagger

# Documentação Swagger

A API possui documentação automática utilizando o padrão OpenAPI por meio dos plugins **@fastify/swagger** e **@fastify/swagger-ui**.

Após iniciar a aplicação, a documentação estará disponível em:

```text
http://localhost:3333/docs
```

A interface permite:

- Visualizar todos os endpoints da API;
- Consultar os métodos HTTP disponíveis;
- Ver os parâmetros esperados em cada rota;
- Visualizar o corpo (Body) das requisições;
- Conferir as respostas da API;
- Testar as requisições diretamente pelo navegador.
---

# Endpoints Disponíveis

## Pokémon

```text
GET     /pokemon
GET     /pokemon/:id
POST    /pokemon
PUT     /pokemon/:id
DELETE  /pokemon/:id
```

---

## Treinador

```text
GET     /treinador
GET     /treinador/:id
POST    /treinador
PUT     /treinador/:id
DELETE  /treinador/:id
```

---

## Tipo

```text
GET     /tipo
GET     /tipo/:id
POST    /tipo
PUT     /tipo/:id
DELETE  /tipo/:id
```

---

## Pokédex

```text
GET     /pokedex
GET     /pokedex/:id
POST    /pokedex
PUT     /pokedex/:id
DELETE  /pokedex/:id
```

---

# Como Executar o Projeto Localmente

## 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

---

## 2. Acessar a pasta do projeto

```bash
cd MiniTables-
```

---

## 3. Instalar dependências

Execute:

```bash
npm install
```

---

# Variáveis de Ambiente

Crie um arquivo chamado:

```text
.env
```

na raiz do projeto.

Adicione:

```env
DATABASE_URL=sua_connection_string_do_neon
```

A variável representa a conexão com o banco PostgreSQL hospedado no Neon Database.

---

# Configuração do Banco

O arquivo:

```text
database.sql
```

contém todos os comandos necessários para recriação do banco.

Ele possui:

- CREATE TABLE;
- Primary Keys;
- Foreign Keys;
- Restrições;
- Relacionamentos.

Execute o arquivo no PostgreSQL/Neon antes de iniciar a aplicação.

---

# Inicialização do Projeto

## Ambiente de desenvolvimento

```bash
npm run dev
```

---

## Ambiente de produção

```bash
npm start
```

---

Após iniciar, a API estará disponível em:

```text
http://localhost:3000
```

E a documentação Swagger estará disponível em:

```text
http://localhost:3000/docs
```

---

# Testes da API

A aplicação pode ser testada utilizando:
- Swagger UI;

# Considerações Finais

O MiniTables Pokémon API demonstra a aplicação prática de conceitos modernos de desenvolvimento backend, utilizando uma arquitetura organizada e escalável.

O projeto aplica padrões utilizados no mercado, garantindo:

- Código organizado;
- Fácil manutenção;
- Separação clara de responsabilidades;
- Maior escalabilidade;
- Documentação completa;
- Integração eficiente com banco de dados.
