import express from 'express'
import { getUser, postUser, postLogin } from '../controllers/routerUser.js'
import { auth } from '../middlewares/auth.js'

const routerUser = express.Router()

routerUser.get('/users', getUser)

routerUser.post('/users', postUser)

routerUser.post('/validUser', postLogin)

export default routerUser