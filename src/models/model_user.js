const {
  queryAction
} = require('../helpers/helper_query')

module.exports = {
  createUser: (data) => {
    return queryAction(`INSERT INTO "user"
    VALUES ()`, [data])
  },
  createUserDetail: (data) => {
    return queryAction(`INSERT INTO "user_detail"
    VALUES ()`, [data])
  },
  getAllAdmin: () => {
    return queryAction(`SELECT * FROM "user" WHERE role = admin`)
  },
  getAllCustomer: () => {
    return queryAction(`SELECT * FROM "user" WHERE role = customer`)
  },
  getUserByEmail: (email) => {
    return queryAction(`SELECT * FROM "user" WHERE email = $1`, [email])
  },
  getUserDetailById: (id) => {
    return queryAction(`SELECT user_detail.*, user.* FROM "user_detail"
      INNER JOIN "user" ON user_detail.user_id = user.id WHERE user_detail.user_id = ?`,
      [id]
    )
  },
  modifyUser: (data, detail, id) => {
    const { username, email, phone, updated_at } = data
    const { first_name, last_name, birth_date, gender, address, image } = detail
    const setData =
      `SET A.username = '${username}', A.email = '${email}',
      A.phone = '${phone}', A.updated_at = $1,`
    const setDetail =
      `B.first_name = '${first_name}', B.last_name = '${last_name}',
      B.birth_date = '${birth_date}', B.gender = $2,
      B.address = $3, B.image = $4,
      B.updated_at = $5`
    return queryAction(
      `UPDATE "user" A INNER JOIN "user_detail" B ON A.id = B.user_id
      ${setData} ${setDetail} WHERE A.id = $ AND B.user_id = $6`,
      [updated_at, gender, address, image, detail.updated_at, id, id]
    )
  },
  removeUser: (id) => {
    return queryAction(`DELETE FROM "user" WHERE id = $1`, [id])
  }
}
