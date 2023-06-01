import express from 'express'

import { setUserOnResponseLocalsByJWT } from '../users'
import { setUserProductOnResponseLocalsById } from './middlewares'
import {
  getUserProduct,
  getUserProducts,
  createUserProduct,
  deleteProduct,
  updateUserProduct,
  useUserProduct,
  disuseUserProduct,
  discardUserProduct,
  reiterateUserProduct
} from './controllers'

const router = express.Router()

router.use('/user_products', setUserOnResponseLocalsByJWT)

router.get('/user_products', getUserProducts)
router.post('/user_products', createUserProduct)

router.use('/user_products/:id', setUserProductOnResponseLocalsById)

router.get('/user_products/:id', getUserProduct)
router.put('/user_products/:id', updateUserProduct)
router.delete('/user_products/:id', deleteProduct)

router.post('/user_products/:id/use', useUserProduct)
router.delete('/user_products/:id/use', disuseUserProduct)

router.post('/user_products/:id/discard', discardUserProduct)
router.delete('/user_products/:id/discard', reiterateUserProduct)

export { router as userProductsRouter }
