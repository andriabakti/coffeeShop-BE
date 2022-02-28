<style>
  #title {
    border-bottom: none
  }
</style>

<p align="center">
  <h1 align="center" id="title">CoffeTeria - API</h1>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
  - [Built With](#built-with)
- [Setup for Development](#setup-for-development)
  - [Requirements](#requirements)
  - [Installation](#installation)
- [API Documentation](#api-documentation)
- [Related Project](#related-project)
- [License](#license)
- [Contact](#contact)

## Introduction

This is the API for CoffeeTeria, a web-based café or coffee shop application where the customer can be easily orders available foods & beverages in the menu by their own self

### Built With

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)

## Setup for Development

### Requirements

- [Node.js](https://nodejs.org/en/download/)
- [Database](db-example.sql) (MySQL)
- [Postman](https://www.getpostman.com/) (for testing)

### Installation

1. Clone the repository

```sh
git clone https://github.com/andriabakti/coffeeteria-backend.git`
```

2. Install package dependencies

```sh
npm install
```

3. Create .env file in your project's root folder & set all the variables below

```sh
# ENV: Port
PORT='your_port'
# ENV: JWT
JWT_KEY='your_jwt_private_key'
# ENV: Database
DB_HOST='localhost'
DB_USER='your_database_user'
DB_PASSWORD='your_database_password'
DB_NAME='db_coffeeteria'
# ENV: Clodinary
CLOUD_NAME='your_cloudinary_cloud_name'
CLOUD_KEY='your_cloudinary_API_key'
CLOUD_SECRET='your_cloudinary_API_secret'

```

4. Make sure you already import the [example database](db-example.sql) to your local database
5. Run the app locally in development mode

```sh
npm run dev
```

## API Documentation

You can see & access all the endpoint by click the button below to import the collection into your Postman:</br>
</br>
[![Run in Postmant](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/bf76bfe66bec5925ebeb)

## Related Project

- [`CoffeeTeria: Frontend`](https://github.com/andriabakti/coffeeteria-frontend)

## License

- [MIT](https://choosealicense.com/licenses/mit/)

## Contact

Email : andr.bkti@gmail.com
