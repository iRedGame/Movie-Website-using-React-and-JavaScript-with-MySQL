import express from 'express'
import db from '../controllers/db.js'
import {auth} from '../middlewares/auth.js'
import {getHistory, postHistory, updateHistory} from '../controllers/routerHistory.js'

const routerHistory = express.Router()

routerHistory.get('/history', auth, getHistory)

routerHistory.post('/history', auth, postHistory)

routerHistory.put('/history/:movieId', auth, updateHistory)

export default routerHistory