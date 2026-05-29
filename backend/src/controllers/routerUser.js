import db from './db.js'
import bcrypt, { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) => {
    try {
        const [users] = await db.query(
            `SELECT * FROM users`
        )
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: `Internal serve error`})
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
        res.status(500).json({message: `Internal serve erroe`})
    }
}

export const postLogin = async (req, res) => {
    try {
        const {email, password} = req.body

        const [userLogin] = await db.query(
            `SELECT * FROM users WHERE email = ?`, [email]
        )
        
        const receiveCryptPs = await bcrypt.compare(password, userLogin[0].password)
        
        if(!receiveCryptPs) {
            return res.status(400).json({message: `Password wrong`})
        }

        if(userLogin.length === 0) {
            return res.status(400).json({message: `User do not exist`})
        }
        const webToken = jwt.sign(
            {
                id: userLogin[0].id,
                email: userLogin[0].email
            }, process.env.JWT_SECRET, {expiresIn: '15d'}
        )

        res.status(200).json({message: `User entered`, token: webToken})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: `Internal serve error`})
    }
}

export const putUser = async (req, res) => {
    try {
        const { name, email, lastPs, newPs } = req.body
        const formatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const formatPs = /\d/

        if(!name || !email || !lastPs || !newPs) {
            return res.status(400).json({message: `Field is not fill`})
        }

        if(name.length < 4) {
            return res.status(400).json({message: `Name small`})
        }

        if(email.length === 0 || !formatEmail.test(email)) {
            return res.status(400).json({message: `Invalid Email`})
        }

        //valid email
        const [validEmail] = await db.query(
            `SELECT * FROM users WHERE email = ? AND id != ?`, 
            [email, req.userId]
        )

        if(validEmail.length > 0) {
            return res.status(400).json({message: `Email already exist`})
        }

        //valid password
        const [user] = await db.query(
            `SELECT * FROM users WHERE id = ?`, [req.userId]
        )
        const validPs = await bcrypt.compare(lastPs, user[0].password)

        if(!validPs) {
            return res.status(400).json({message: `Password is not same as old one`})
        }

        if(newPs.length < 8 || !formatPs.test(newPs)) {
            return res.status(400).json({message: `Password invalid`})
        }

        const psCrypt = await bcrypt.hash(newPs, 10)

        await db.query(
            `UPDATE users SET name = ?, email = ?, password = ?
             WHERE id = ?`, [name, email, psCrypt, req.userId]
        )

        res.status(200).json({message: 'User updated'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'Internal serve error'})
    }
}