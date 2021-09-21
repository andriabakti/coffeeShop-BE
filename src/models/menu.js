const {actionQuery} = require('../helpers/helpers')

module.exports = {
  _getAllMenu: () => {
    return actionQuery('SELECT * FROM menu')
  },
  _insertMenu: ({name, price, description, image, created_at, updated_at}) => {
    const queryData = {
      text: 'INSERT INTO menu(name, price, description, image, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6)',
      values: [name, price, description, image, created_at, updated_at]
    }
    return actionQuery(queryData)
  }
}