import db from './db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) => {
    try {
        const [users] = await db.query(
            `SELECT * FROM users`
        )
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message)
    }
}

export const postUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        const formatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const formatPs = /\d/

        const [user] = await db.query(
            `SELECT * FROM users WHERE email =?`, [email]
        )

        if(user.length > 0) {
            return res.status(400).json({message: `Email already exist`})
        }

        if(name.length < 4) {
            return res.status(400).json({message: 'Name user small'})
        }

        if(!formatEmail.test(email)) {
            return res.status(400).json({message: `Email not required`})
        }

        if(password.length < 8 || !formatPs.test(password)) {
            return res.status(400).json({message: `Password not required`})
        }

        const cryptPs = await bcrypt.hash(password, 10)
        await db.query(
            `INSERT INTO users (name, email, password)
            VALUES ( ?, ?, ?)`, [name, email, cryptPs]
        )
        res.status(201).json({message: 'Created success'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: `Erro server internal`
        })
    }
}

export const postLogin = async (req, res) => {
    try {
        const {email, password} = req.body

        const [user] = await db.query(
            `SELECT * FROM users WHERE email = ?`, [email]
        )

        const receiveCryptPs = await bcrypt.compare(password, user[0].password)

        const webToken = jwt.sign(
            {
                id: user[0].id,
                email: user[0].email
            }, process.env.JWT_SECRET, {expiresIn: '15d'}
        )

        if(user.length === 0) {
            return res.status(400).json({message: `User do not exist`})
        }

        if(!receiveCryptPs) {
            return res.status(400).json({message: `Password wrong`})
        }

        res.status(200).json({message: `User entered`, token: webToken})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: `Error server Internal`})
    }
}