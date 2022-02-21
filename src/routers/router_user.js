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
  verifyAccess
} = require('../middlewares/midware_auth')
const {
  upload
} = require('../middlewares/midware_multer')

router
  .get('/', readAllCustomer)
  .get('/admin', readAllAdmin)
  .get('/:id', verifyAccess, readUserDetail)
  .patch('/:id', verifyAccess, upload.single('image'), updateUser)
  .delete('/:id', deleteUser)
module.exports = router