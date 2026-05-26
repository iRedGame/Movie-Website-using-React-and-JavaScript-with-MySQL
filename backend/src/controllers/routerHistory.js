import db from './db.js'

export const getHistory = async (req, res) => {
    try {
        const [userWatchedMovie] = await db.query(
            `SELECT movies.id AS movieId, movies.title, movies.image, history.currentTime, history.duration,
             MAX(history.watchTime) AS lastWatch FROM history

             JOIN movies ON history.movieId = movies.id WHERE history.userId = ?
             GROUP BY movies.id, movies.title, movies.image
             ORDER BY lastWatch DESC`, [req.userId]
        )
        res.status(200).json(userWatchedMovie)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: `Error serve Internal`})
    }
}

export const postHistory = async (req, res) => {
    try {
        const {movieId} = req.body
        
        const [alreadyMovie] = await db.query(
            `SELECT * FROM history WHERE userId = ? and movieId = ?`,
            [req.userId, movieId]
        )

        if(alreadyMovie.length === 0) {
            await db.query(
                `INSERT IGNORE INTO history (userId, movieId)
                 VALUES (?, ?)`, [req.userId, movieId]
            )
        }

        res.status(201).json({message: `Movie saved History`})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'Error serve Internal'})
    }
}

export const updateHistory = async (req, res) => {
    try {
        const {movieId} = req.params
        const {currentTime, duration} = req.body
        await db.query(
            `UPDATE history SET currentTime = ?, duration = ? 
             WHERE userId = ? AND movieId = ?`,
            [currentTime, duration, req.userId, movieId]
        )

        res.status(200).json({message: `Update history`})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: `Error serve Internal`})
    }
}