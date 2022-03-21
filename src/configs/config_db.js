// package: pg
const { Pool } = require('pg')

const connection = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
  // connectionString: `${process.env.DATABASE_URL}?sslmode=no-verify`
})
module.exports = connection
