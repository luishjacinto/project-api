import express from 'express'

import { userProductsImagesControllers } from '../../../controllers'

const router = express.Router()

router.post('/user_products/:id/images', ...userProductsImagesControllers.createUserProductImage)
router.delete('/user_products/:id/images', ...userProductsImagesControllers.deleteUserProductImage)

export { router as userProductsImagesRouter }
