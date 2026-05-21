import express from 'express'
import db from '../config/db.js'
import upload from '../config/multer.js'
import { getMovies, getMoviesId ,
         createMovie, getMoreWatch,
         getShowMoreWatch, getLastAdd } from '../config/router.js'

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