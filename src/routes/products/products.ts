import express from 'express'

import { setUserOnResponseLocalsByJWT } from '../users/'
import { setProductOnResponseLocalsByGTINOrExternalApi } from './middlewares'
import {
  getProduct
} from './controllers'


const router = express.Router()

router.use(setUserOnResponseLocalsByJWT)

router.get('/products/:gtin', setProductOnResponseLocalsByGTINOrExternalApi, getProduct)

export { router as productsRouter }
