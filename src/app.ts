import express from 'express'
import { json } from 'body-parser'
import morgan from 'morgan'

import {
    productsRouter,
    userProductsRouter,
    userRouter,
    applicationRouter
} from './routes'
import { defaultApplicationConfig } from './config/default-application-config'
import { rootMiddlewares } from './middlewares'

const app = express()

app.set('config', defaultApplicationConfig)

app.use(json())
app.use(morgan('dev'))

app.use(userRouter)
app.use(applicationRouter)

app.use(rootMiddlewares.verifyIfApplicationIsNotUnderMaintenance)
app.use(userProductsRouter)
app.use(productsRouter)

export default app