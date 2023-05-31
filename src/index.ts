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

app.use(json())
app.use(userRouter)
app.use(userProductsRouter)
app.use(productsRouter)

connect()

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})