const { queryHelper } = require('../helpers/query')

module.exports = {
  newCategory: (data) => {
    return queryHelper('INSERT INTO categories SET ?', data)
  },
  fetchCategories: () => {
    return queryHelper('SELECT * FROM categories')
  },
  fetchCategoryById: (id) => {
    return queryHelper('SELECT categories.* FROM categories WHERE id = ?', id)
  },
  editCategory: (data, id) => {
    return queryHelper('UPDATE categories SET ? WHERE id = ?', [data, id])
  },
  removeCategory: (id) => {
    return queryHelper('DELETE FROM categories WHERE id = ?', id)
  }
}