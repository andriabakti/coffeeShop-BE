// helper: query
const { queryAction } = require('../helpers/helper_query')

module.exports = {
  createUser: (payload) => {
    return queryAction(`INSERT INTO "user"
    (username, email, password, phone, role, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id `,
      [payload.username, payload.email, payload.password, payload.phone, payload.role, payload.created_at]
    )
  },
  createUserDetail: (payload) => {
    return queryAction(`INSERT INTO "user_detail"
    (user_id, created_at) VALUES ($1, $2)`, [payload.user_id, payload.created_at])
  },
  getAllAdmin: () => {
    return queryAction(`SELECT * FROM "user" WHERE role = 'admin'`)
  },
  getAllCustomer: () => {
    return queryAction(`SELECT * FROM "user" WHERE role = 'customer'`)
  },
  getUserByEmail: (email) => {
    return queryAction(`SELECT * FROM "user" WHERE email = $1`, [email])
  },
  getUserDetailById: (id) => {
    return queryAction(`SELECT a.*, b.* FROM "user_detail" a
      INNER JOIN "user" b ON a.user_id = b.id WHERE a.user_id = $1`, [id])
  },
  modifyUser: (data, id) => {
    const { username, email, phone, updated_at } = data
    return queryAction(`UPDATE "user" SET (username, email, phone, updated_at) =
      ($1, $2, $3, $4) WHERE id = $5`, [username, email, phone, updated_at, id]
    )
  },
  modifyUserDetail: (detail, id) => {
    const { first_name, last_name, birth_date, gender, address, image, updated_at } = detail
    return queryAction(`UPDATE "user_detail"
      SET (first_name, last_name, birth_date, gender, address, image, updated_at) =
      ($1, $2, $3, $4, $5, $6, $7) WHERE user_id = $8`,
        [first_name, last_name, birth_date, gender, address, image, updated_at, id]
    )
  },
  removeUser: (id) => {
    return queryAction(`DELETE FROM "user" WHERE id = $1`, [id])
  }
}
