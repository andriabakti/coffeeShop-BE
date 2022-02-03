const express = require('express')
const router = express.Router()

const {
  createHistory,
  readAllHistory,
  deleteHistory
} = require('../controllers/controller_history')

router
  .post('/', createHistory)
  .get('/', readAllHistory)
  .delete('/:id', deleteHistory)
module.exports = router
