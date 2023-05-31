import dotenv from 'dotenv'
import { json } from 'body-parser'

import express from 'express'
import { connect } from './database/database'

import {
    productsRouter,
    userProductsRouter,
    userRouter
} from './routes'

dotenv.config()

const PORT = process.env.PORT

if (!PORT) {
    throw new Error("No PORT on environment variables")
}

const app = express()

connect()

app.use(json())
app.use(productsRouter)
app.use(userProductsRouter)
app.use(userRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})