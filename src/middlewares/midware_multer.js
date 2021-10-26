const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    // TODO: random name
    const date = new Date().toDateString().split(' ').join('_')
    const time = new Date().toLocaleTimeString().split(':').join('')
    const unique = Date.now()
    const name = file.originalname.split(' ').join('_')
    cb(null, `${date}-${time}-${unique}-${name}`)
  }
})

// TODO: validasi filename, type & size
const upload = multer({
  storage: storage
})

module.exports = {
  upload
}
