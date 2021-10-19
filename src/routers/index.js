const { Router } = require('express')
const productRoutes = require('./router_product')
const categoryRoutes = require('./router_category')
const router = Router()

module.exports = router
	.use('/products', productRoutes)
	.use('/categories', categoryRoutes)
	.use('/users', (_req, res) => {
		res.send('Users route')
	})
