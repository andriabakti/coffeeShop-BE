const express = require('express')
const router = express.Router()

const {
  readAllCustomer,
  readAllAdmin,
  readUserDetail,
  updateUser,
  deleteUser
} = require('../controllers/controller_user')
const {
  upload
} = require('../middlewares/midware_multer')

router
  .get('/', readAllCustomer)
  .get('/admin', readAllAdmin)
  .get('/:id', readUserDetail)
  .patch('/:id', upload.single('image'), updateUser)
  .delete('/:id', deleteUser)
module.exports = router