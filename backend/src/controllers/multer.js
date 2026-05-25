import multer from 'multer'
import cloudinary from './cloudinary.js'

const storage = multer.diskStorage({})

const upload = multer({storage})

export default upload