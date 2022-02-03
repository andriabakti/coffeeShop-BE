const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    // TODO: random name
    const unique = Date.now()
    const date = new Date().toDateString().split(' ').join('_')
    const time = new Date().toLocaleTimeString().split(':').join('')
    const name = file.originalname.split(' ').join('_')
    cb(null, `${unique}-${date}-${time}-${name}`)
  }
})

// TODO: validasi filename, type & size
const upload = multer({
  storage: storage
})

module.exports = {
  upload
}
