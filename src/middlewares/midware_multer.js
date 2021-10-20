const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    // TODO: random name
    cb(null, new Date().toISOString() + file.originalname)
  }
})

// TODO: validasi filename, type & size
const upload = multer({
  storage: storage
})

module.exports = {
  upload: upload
}
