<p align="center">
  <img alt="compass logo" src="https://user-images.githubusercontent.com/65569815/176964539-fe858838-0d07-418e-9220-b6d94461ecee.png" />
</p>

# 🏪 Compass Store

Desafio final do **Programa de Bolsas de NodeJS da [Compass.uol](https://compass.uol/)**.

## 🧾 Sumário
* ### [Como inicializar](#-como-inicializar)
* ### [Endpoints](#-endpoints)
* ### [Schemas](#-schemas)

## 📖 Descrição
A compasso entrou em um novo ramo de mercado, a CompassMart a qual é uma loja de departamento, onde seu foco é a comercialização de alimentos. Para essa
API vai ser necessário desenvolver algumas rotas.

## 🧰 Tecnologias

<p>
  <img src="https://user-images.githubusercontent.com/65569815/182266557-f2d0c589-fe31-4d65-b867-cb40385066a0.svg" width="100">
  <img src="https://user-images.githubusercontent.com/65569815/182253645-6966537e-18ed-4c47-974b-22510cc3d834.png" width="100">
</p>

Para o desenvolvimento deste projeto, utilizamos a linguagem Typescript, NodeJS com Express, Mongoose para a conexão ao banco de dados MongoDB.
<br/>

## 🔑 Requisitos

Antes de começar, você vai precisar ter instalado em sua máquina o Node.js, também é necessário uma collection no MongoDB Atlas e não se esqueça de criar a pasta `.env` seguindo o arquivo `.env.example`.

## 🏁 Como inicializar

Como descrito nos requisitos acima, primeiramente você precisa instalar o [NodeJS](https://nodejs.org/en/)
<br/>
Depois você irá executar os seguintes comandos:

```bash
# Clona este repositório
$ git clone https://github.com/AntonioRdC/PB-NOR-nodejs-Desafio-05.git
# Acessa a pasta do projeto
$ cd PB-NOR-nodejs-Desafio-05
# Instala as dependências
$ npm install
```

Agora que você já possui as dependências instalas, basta iniciar o projeto (Não se esqueça de configurar as variáveis de ambiente no arquivo `.env`)

```bash
# Inicia a aplicação em localhost:3000
$ npm run dev
```

## 🚪 Endpoints

### Product Endpoints
|       Route           |    Method    |                   Description                     |
|   ---------------     | :----------: |  ----------------------------------------------   |
|  `/api/v1/product`           |    POST      |  Creates a product                         |
|  `/api/v1/product/csv`       |    POST      |  Creates a products with CSV               |
|  `/api/v1/product`           |    GET       |  Gets all of products                      |
|  `/api/v1/product/low_stock` |    GET       |  Gets products with low stock              |
|  `/api/v1/product/:id`       |    GET       |  Gets the product by its ID                |
|  `/api/v1/product/:id`       |    PUT       |  Updates all values of product by ID       |
|  `/api/v1/product/:id`       |    PATCH     |  Updates parcial values of product by ID   |
|  `/api/v1/product/:id`       |    DELETE    |  Deletes the product by its ID             |

## 🧱 Schema

### Product Table
|         FieldName        |    Type   | Required | Unique |
|--------------------------|:---------:|:--------:|:------:|
| `_id`                    | ObjectId  | true     | true   |
| `title`                  | String    | true     | false  |
| `description`            | String    | true     | false  |
| `department`             | Number    | true     | false  |
| `bar_codes`              | Number    | true     | true   |
| `brand`                  | Number    | true     | false  |
| `price`                  | Number    | true     | false  |
| `qtd_stock`              | Number    | true     | false  |
| `stock_control_enabled`  | Number    | false    | false  |


## ✋🏻 Autor
<img src="https://avatars.githubusercontent.com/AntonioRdC" width=115>  
<a href="https://github.com/AntonioRdC">Antonio Carvalho</a>
