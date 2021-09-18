const connection = require('../configs/db')

module.exports = {
  _getAllMenu: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM menu', (err, result) => {
          if(!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
    })
  }
}