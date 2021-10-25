const { Router } = require('express')
const productRoutes = require('./router_product')
const categoryRoutes = require('./router_category')
const userRoutes = require('./router_user')
const authRoutes = require('./router_auth')
const router = Router()

module.exports = router
	.use('/auth', authRoutes)
	.use('/user', userRoutes)
	.use('/product', productRoutes)
	.use('/category', categoryRoutes)
