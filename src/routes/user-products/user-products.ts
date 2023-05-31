import express from 'express'

import { setUserOnResponseLocalsByJWT } from '../users'
import { setUserProductOnResponseLocalsById } from './middlewares'
import {
  getUserProduct,
  getUserProducts,
  createUserProduct,
  deleteProduct,
  updateUserProduct,
} from './controllers'

const router = express.Router()

router.use(setUserOnResponseLocalsByJWT)

router.get(`/user_products`, getUserProducts)

router.get(`/user_products/:id`, setUserProductOnResponseLocalsById, getUserProduct)

router.post(`/user_products`, createUserProduct)

router.put(`/user_products/:id`, setUserProductOnResponseLocalsById, updateUserProduct)

router.delete(`/user_products/:id`, setUserProductOnResponseLocalsById, deleteProduct)

export { router as userProductsRouter }
