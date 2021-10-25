const authRoutes = require('./router_auth')
const userRoutes = require('./router_user')
const productRoutes = require('./router_product')
const categoryRoutes = require('./router_category')

const express = require('express')
const router = express.Router()

router
	.use('/auth', authRoutes)
	.use('/user', userRoutes)
	.use('/product', productRoutes)
	.use('/category', categoryRoutes)
module.exports = router