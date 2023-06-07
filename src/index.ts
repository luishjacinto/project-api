import dotenv from 'dotenv'
import express from 'express'
import { json } from 'body-parser'
import morgan from 'morgan'

import * as database from './database/database'

import {
    productsRouter,
    userProductsRouter,
    userRouter,
    draftsRouter,
    applicationRouter
} from './routes'
import { defaultApplicationConfig } from './config/default-application-config'
import { rootMiddlewares } from './middlewares'

dotenv.config()

const PORT = process.env.PORT

if (!PORT) {
    throw new Error("No PORT on environment variables")
}

const app = express()

app.set('config', defaultApplicationConfig)

app.use(json())
app.use(morgan('dev'))

app.use(userRouter)
app.use(applicationRouter)

app.use(rootMiddlewares.verifyIfApplicationIsNotUnderMaintenance)
app.use(userProductsRouter)
app.use(productsRouter)
app.use(draftsRouter)

database.connect()

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
