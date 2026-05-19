import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './router/movieRouter.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

app.listen(process.env.PORT, ()=> {
    console.log('Running')
})