import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routerMovie from './router/movieRouter.js'
import routerUser from './router/userRouter.js'
import routerHistory from './router/history.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(routerMovie)
app.use(routerUser)
app.use(routerHistory)

app.listen(process.env.PORT, ()=> {
    console.log('Running')
})