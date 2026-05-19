import express from 'express'
import db from '../config/db.js'
import upload from '../config/multer.js'
import { getMovies, getMoviesId ,
         createMovie, getMoreWatch,
         getShowMoreWatch, getLastAdd } from '../config/router.js'

const router = express.Router()

router.post('/movies', upload.fields([
            {name: 'video', maxCount: 1},
            {name: 'image', maxCount: 1}
        ]),
        createMovie)

router.get('/movies', getMovies)

router.get('/movies/views', getShowMoreWatch)

router.get('/movies/lastAdd', getLastAdd)

router.get('/movies/:id', getMoviesId)

router.put('/movies/views/:id', getMoreWatch)

export default router