import express from 'express'

import { rootMiddlewares, userProductsMiddlewares } from '../../middlewares'
import { userProductsControllers } from '../../controllers'
import { userProductsImagesRouter } from './images'
import { userProductsUseRouter } from './use'
import { userProductsDiscardRouter } from './discard'

const router = express.Router()
router.use('/user_products', rootMiddlewares.setUserOnResponseLocalsByJWT)

router.get('/user_products', userProductsControllers.getUserProducts)

router.post('/user_products', userProductsControllers.createUserProduct)

router.use('/user_products/:id', userProductsMiddlewares.setUserProductOnResponseLocalsById)

router.get('/user_products/:id', userProductsControllers.getUserProduct)
router.put('/user_products/:id', userProductsControllers.updateUserProduct)
router.delete('/user_products/:id', userProductsControllers.deleteUserProduct)

router.use(userProductsImagesRouter)
router.use(userProductsUseRouter)
router.use(userProductsDiscardRouter)

export { router as userProductsRouter }
