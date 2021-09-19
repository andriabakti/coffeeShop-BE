const connection = require('../configs/db')

module.exports = {
  _getAllMenu: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM menu', (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  _insertMenu: (data) => {
    const {name, price, description, image, created_at, updated_at} = data
    const queryData = {
      text: 'INSERT INTO menu(name, price, description, image, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6)',
      values: [name, price, description, image, created_at, updated_at]
    }
    return new Promise((resolve, reject) => {
      connection.query(queryData, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}