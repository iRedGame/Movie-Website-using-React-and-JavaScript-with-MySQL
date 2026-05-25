import upload from './multer.js'
import cloudinary from './cloudinary.js'
import db from './db.js'

export const getMovies = async (req, res) => {
    try {
        const [movies] = await db.query(
            `SELECT * FROM movies`
        )
        res.status(200).json(movies)
    } catch (error) {
        console.log(error.message)
    }
}

export const getMoviesId = async (req, res) => {
    try {
        const { id } = req.params
        const [movie] = await db.query(
            `SELECT * from movies WHERE id = ?`,
            [id]
        )
        res.json(movie[0])
    } catch (error) {
        console.log(error.message)
    }
}

export const getLastAdd = async (req, res) => {
    try {
        const [movies] = await db.query(
            `SELECT * FROM movies ORDER BY id DESC`
        )
        res.status(200).json(movies)
    } catch (error) {
        console.log(error.message)
    }
}

export const getShowMoreWatch = async (req, res) => {
    try {
        const [movies] = await db.query(
            `SELECT * FROM movies ORDER BY views DESC`
        )
        res.status(200).json(movies)
    } catch (error) {
        console.log(error.message)
    }
}

export const getMoreWatch = async (req, res) => {
    try {
        const {id} = req.params

        if(!id) return
        await db.query(
            `UPDATE movies 
            SET views = views + 1
            WHERE id = ?`, [id]
        )
        res.json({
            sucess: 'views updated'
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const createMovie = async (req, res) => {
    try {
        const { title, category } = req.body


        if (!req.files?.video || !req.files?.image) {
            return res.status(400).json({ error: 'Not file' })
        }

        const videoUpload = await cloudinary.uploader.upload(req.files.video[0].path,
            { resource_type: 'video', folder: 'movies/videos' })
        const imageUpload = await cloudinary.uploader.upload(req.files.image[0].path,
            { folder: 'movies/image' })

        await db.query(
            `INSERT INTO movies (title, category, image, video)
                    VALUES (?, ?, ?, ?)`,

            [title, category, imageUpload.secure_url, videoUpload.secure_url]
        )

        res.status(201).json({sucess: 'Movie send'})

    } catch (error) {
        console.log(error.message)
    }
}
