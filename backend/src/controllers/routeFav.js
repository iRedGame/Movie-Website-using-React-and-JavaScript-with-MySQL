import db from './db.js'

export const postFav = async (req, res) => {
    try {
        const { movieId } = req.body

        const validPost = db.query(
            'SELECT * FROM favorites WHERE userId = ? AND movieId = ?',
            [req.userId, movieId]
        )

        if(validPost.length > 0) {
            await db.query(
                `DELETE FROM favorites WHERE userId = ? and movieId = ?`,
                [req.userId, movieId]
            )
            return res.status(200).json({favorite: false})
        }

        await db.query(
            `INSERT INTO favorites (userId, movieId) VALUES (?, ?)`,
            [req.userId, movieId]
        )

        res.status(201).json({ favorite: true})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal serve error' })
    }
}

export const deleteFav = async (req, res) => {
    try {
        const {id} = req.params
        
        await db.query(
            `DELETE FROM favorites WHERE userId = ? AND movieId = ?`,
            [req.userId, id]
        )
        res.status(200).json({message: `Fav movie was remove`})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: `Internal serve error`})
    }
}

export const getFav = async (req, res) => {
    try {

        const [moviesFav] = await db.query(
            `SELECT movies.* FROM favorites
             JOIN movies ON favorites.movieId = movies.id
             WHERE favorites.userId = ?`, [req.userId]
        )

        res.status(200).json(moviesFav)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal serve error' })
    }
}