import express from 'express'

import { userProductsUseControllers } from '../../../controllers'

const router = express.Router()

router.post('/user_products/:id/use', userProductsUseControllers.useUserProduct)
router.delete('/user_products/:id/use', userProductsUseControllers.disuseUserProduct)

export { router as userProductsUseRouter }
