// model: product
const {
  insertProduct,
  getAllProduct,
  getProductById,
  editProduct,
  removeProduct,
  getSearch,
  getTotal
} = require('../models/model_product')
// helper: response
const {
	response,
	pageInfo
} = require('../helpers/helper_resp')

module.exports = {
  createProduct: (req, res) => {
    const { name, price, description, category_id } = req.body
    const data = {
      name,
      price,
      description,
      category_id,
      image: req.file.path,
      created_at: new Date()
    }
    insertProduct(data)
      .then((_result) => {
        response(res, [], res.statusCode, `${name} created successfully`, null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, `Failed to create ${name}`, null, error)
      })
  },
  readAllProduct: (req, res) => {
    const search = req.query.search || ''
    const filter = req.query.filter || ''
    const sort = req.query.sort || 'id'
    const order = req.query.order || 'ASC'
    const limit = Number(req.query.limit) || 3
    const page = Number(req.query.page) || 1
		const offset = (page === 0 ? 1 : page - 1) * limit
		let totalData

    if (search) {
      getSearch(search, filter)
        .then((result) => {
          totalData = result.rows.length
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      getTotal(filter)
        .then((result) => {
          totalData = result.rows[0].total
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getAllProduct(search, filter, sort, order, limit, offset)
      .then((result) => {
        const count = result.rows.length
        const total = parseInt(totalData)
        const links = pageInfo(limit, page, total, count)
        response(res, result.rows, res.statusCode, "Products found", links, null)
      })
      .catch((error) => {
        console.log(error);
        response(res, error, error.statusCode, "Products not found", null, error)
      })
  },
  readProductById: (req, res) => {
    const { id } = req.params
    getProductById(id)
      .then((result) => {
        response(res, result.rows, res.statusCode, "Product found", null, null)
      })
      .catch((error) => {
        response(res, null, error.statusCode, "Product not found", null, error)
      })
  },
  updateProduct: async (req, res) => {
    const { id } = req.params
    const { name, price, description, category_id } = req.body
    let image
    if (req.file) {
      image = req.file.path
    } else if (req.body.image === 'null') {
      image = null
    } else if (req.body.image) {
      image = req.body.image
    }
    const data = {
      name,
      price,
      description,
      category_id,
      image,
      updated_at: new Date()
    }
    editProduct(data, id)
      .then((_result) => {
        response(res, [], res.statusCode, "Product updated successfully", null, null)
      })
			.catch((error) => {
				console.log(error)
        response(res, [], error.statusCode, "Failed to update this product", null, error)
      })
  },
  deleteProduct: (req, res) => {
    const { id } = req.params
    const data = {
      is_deleted: 1,
      deleted_at: new Date()
    }
    removeProduct(data, id)
      .then((_result) => {
        response(res, [], res.statusCode, "Product deleted successfully", null, null)
      })
      .catch((error) => {
        console.log(error)
        response(res, [], error.statusCode, "Failed to delete this product", null, error)
      })
  }
}
