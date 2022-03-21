// config: database
const pool = require('../configs/config_db')

module.exports = {
  queryAction: (...args) => {
    return new Promise((resolve, reject) => {
      pool.query(...args, (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(new Error(err.message))
        }
      })
    })
  }
}
