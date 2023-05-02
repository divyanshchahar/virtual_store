# VIRTUAL STORE

## About Project

Virtual Store is an e-commerce app built as a yarn monorepo using MERN stack. Frontend react app can be found in `../client` directory and the express API server resides insides `../server` directory.

## Prerequisite

1. [Node](https://nodejs.org/en)
2. [MongoDB](https://www.mongodb.com/)
3. [Auth0 account](https://auth0.com/) with a Single Page App (React App) and an API (Express API)
4. [Redux Dev Tolls](https://github.com/reduxjs/redux-devtools)

## How to setup the app Locally

> To run this app locally you will need to create **environment variables**, setup a **MongoDB Database** and setup a **react app** and **express API** on an **auth0 account**.

### 1. Build the app locally

```
yarn install
```

### 2. Setup Environemnt Variables for client

Make a `.env` file in the `../client/` with the following content

```
REACT_APP_DOMAIN= domain of the Single Page Application(react app) from the auth0 account

REACT_APP_CLIENT_ID= client ID of the Single Page Application(react app) from auth0 account

REACT_APP_CLIENT_SECRET= client secret of the Single Page Application(react app) from auth0 account

REACT_APP_AUDIENCE= Identifier of the Express API from auth0 account
```

### 3. Setup Environment Variables for server

```
AUDIENCE="Identifier of the Express API from auth0 account"

ISSUERBASEURL="This value is derived from the tenant of the auth0 account and can be obtained from the quick start guide"

ORIGIN="URL of react app"

DATABASE="URL of MongoDB Database"
```

> For the sake of simplicity the value `REACT_APP_AUDIENCE` , `AUDIENCE` and the **address of the express server** are same. In order for authentication to work `REACT_APP_AUDIENCE` and `AUDIENCE` should be same. The value of `REACT_APP_AUDIENCE` is also used in `../client/assets/api_endpints.js` to define the compltet path of api endpoints

### 4. Populating local database

Populate a `products` collection inside a mongoDB database using the data in `../data.json`

> The user is free to use any data of his/her choosing to pupulate a `products` collection in a local MongoDB Database with product data. Each documnet inside this collection must have the following attributes
>
> 1. `name` of type _string_ to describe the name of the product
> 2. `price` of type _number_ to describe the price of the product
> 3. `images` of type _array_ to hold address of product images

### 5. Runing the app in developement app

```
yarn devStart
```

## TROUBLESHOOTING

If the app fails to render or crashes due to some reason, delete the browser history and reset the state using [Redux Dev Tolls](https://github.com/reduxjs/redux-devtools)
