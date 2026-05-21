import express from 'express'
import { getUser, postUser, postLogin } from '../config/routerUser.js'

const routerUser = express.Router()

routerUser.get('/users', getUser)

routerUser.post('/users', postUser)

routerUser.post('/validUser', postLogin)

export default routerUser