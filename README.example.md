# Cafetaria API

![GitHub repo size in bytes](https://img.shields.io/github/repo-size/andriabakti/cafeapp-backend)

This API is for Cafetaria App.

## Build with

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Redis](https://redis.io/)

## Requirements

- [Node.js](https://nodejs.org/en/)
- [Database](dbcafeshop.sql)
- [Postman](https://www.getpostman.com/) for testing
- [Redis](https://redis.io/)

## Project setup

```/
npm install
```

### Install nodemon

Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

If you have already installed, skip this step.

```/
npm install -g nodemon
```

### Setup .env example

Create .env file in your root project folder.

```/
DB_HOST = localhost
DB_USER = root/your_database_user
DB_PASSWORD = your_database_password
DB_DATABASE = dbcafeshop
SECRET_KEY = your_secret_key
REDIS_PORT = 6379
PORT = 4000
URL = http://localhost
```

### Run project for development

```/
npm run dev
```

## End Point

<b>1. Auth</b>
<br>
<b>- POST</b> /api/v1/users/register<br>
<b>- POST</b> /api/v1/users/login<br>
<br>
<b>2. Products</b>
<br>
<b>- GET</b> /api/v1/products/<br>
<b>- POST</b> /api/v1/products/<br>
<b>- DELETE</b> /api/v1/products/:id<br>
<b>- PATCH</b> /api/v1/products/:id<br>

## Related Project

- [Cafetaria](https://github.com/andriabakti/cafeapp-frontend)
