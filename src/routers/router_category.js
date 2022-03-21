// package: express
const { Router } = require('express')
// controller: category
const {
  createCategory,
  readAllCategory,
  readCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/controller_category')

// usage: express-router
const router = Router()

router
  .post('/', createCategory)
  .get('/', readAllCategory)
  .get('/:id', readCategoryById)
  .patch('/:id', updateCategory)
  .delete('/:id', deleteCategory)
module.exports = router
