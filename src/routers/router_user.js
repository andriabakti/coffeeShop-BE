const { Router } = require('express')
// middleware: auth
const { verifyAccess } = require('../middlewares/midware_auth')
// middleware: multer
const upload = require('../middlewares/midware_multer')
// controller: user
const {
  readAllCustomer,
  readAllAdmin,
  readUserDetail,
  updateUser,
  deleteUser
} = require('../controllers/controller_user')

// usage: express-router
const router = Router()

router
  .get('/', readAllCustomer)
  .get('/admin', readAllAdmin)
  .get('/:id', verifyAccess, readUserDetail)
  .patch('/:id', verifyAccess, upload, updateUser)
  .delete('/:id', deleteUser)
module.exports = router
