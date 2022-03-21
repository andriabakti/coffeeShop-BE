// package: multer
const multer = require('multer')
// package: cloudinary
const cloudinary = require('cloudinary').v2
// package: multer-storage-cloudinary
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'app_CoffeeTeria'
  }
})

// TODO: validasi filename, type & size
module.exports = multer({
  storage: storage
}).single('image')
