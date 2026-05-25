import express from 'express'
import db from '../controllers/db.js'
import upload from '../controllers/multer.js'
import { getMovies, getMoviesId ,
         createMovie, getMoreWatch,
         getShowMoreWatch, getLastAdd } from '../controllers/router.js'

const routerMovie = express.Router()

routerMovie.post('/movies', upload.fields([
            {name: 'video', maxCount: 1},
            {name: 'image', maxCount: 1}
        ]),
        createMovie)

routerMovie.get('/movies', getMovies)

routerMovie.get('/movies/views', getShowMoreWatch)

routerMovie.get('/movies/lastadd', getLastAdd)

routerMovie.get('/movies/:id', getMoviesId)

routerMovie.put('/movies/views/:id', getMoreWatch)

export default routerMovie