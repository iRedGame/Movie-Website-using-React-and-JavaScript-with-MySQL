import express from 'express'
import { getUser, postUser, postLogin, putUser } from '../controllers/routerUser.js'
import { auth } from '../middlewares/auth.js'

const routerUser = express.Router()

routerUser.get('/users', getUser)

routerUser.post('/users', postUser)

routerUser.post('/validUser', postLogin)

routerUser.put('/users', auth, putUser)

export default routerUser