import express from 'express'

import { productsMiddlewares, rootMiddlewares } from '../../middlewares'
import { productsControllers } from '../../controllers'

const router = express.Router()

router.use('/products', rootMiddlewares.setUserOnResponseLocalsByJWT)

router.use('/products/:gtin', productsMiddlewares.setProductOnResponseLocalsByGTINOrExternalApi)

router.get('/products/:gtin', productsControllers.getProduct)

export { router as productsRouter }
