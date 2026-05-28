import express from 'express'
import db from '../controllers/db.js'
import {auth} from '../middlewares/auth.js'
import {postFav, getFav, deleteFav} from '../controllers/routeFav.js'

const routerFav = express.Router()

routerFav.get('/favorites', auth, getFav)

routerFav.post('/favorites', auth, postFav)

routerFav.delete('/favorites/:id', auth, deleteFav)

export default routerFav