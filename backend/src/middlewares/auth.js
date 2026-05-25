import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) => {
    try {
        const headerAuth = req.headers.authorization

        if(!headerAuth) {
            return res.status(401).json({message: 'Token not sent'})
        }

        const token = headerAuth.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error){
        console.log(error.message)
        res.status(401).json({message: `Invalid Token`})
    }
}