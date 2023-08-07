# VIRTUAL STORE

## Production Frontend Build

[Website](https://ecommerce-client-1pzm.onrender.com/)

## About Project

Virtual Store is an e-commerce app built as a yarn monorepo using MERN stack. Frontend react app can be found in `../client` directory and the express API server resides insides `../server` directory.

## Prerequisite

1. [Node](https://nodejs.org/en)
2. [MongoDB](https://www.mongodb.com/)
3. [Redux Dev Tools](https://github.com/reduxjs/redux-devtools)

## How to setup the app Locally

> To run this app locally you will need to create **environment variables**, setup a **MongoDB Database** and setup a **react app** and **express API**

### 1. Build the app locally

```
yarn install
```

### 2. Setup Environemnt Variables for client

Make a `.env` file in the `../client/` with the following content

```
REACT_APP_AUDIENCEc= URL of the backend
```

### 3. Setup Environment Variables for server

```
ORIGIN = URL of react app

DATABASE = URL of MongoDB Database

ACESS_TOKEN_SECRET = Secret for acess token

REFRESH_TOKEN_SECRET = Secret for refresh token
```

### 4.Setting up Database

This app uses a MongoDB Database. To setup this app you will need products data. Products collection should satisfy the following schema requirement for proper functioning of the app.

> `name` of type _string_ to describe the name of the product

> `price` of type _number_ to describe the price of the product

> `images` of type _array_ to hold address of product images

The documents in the Products Collection use the data available at https://dummyjson.com/products

## Running the app in development environment

```
yarn run dev
```

## TROUBLESHOOTING

If the app fails to render or crashes due to some reason, delete the browser history and reset the state using [Redux Dev Tolls](https://github.com/reduxjs/redux-devtools)
