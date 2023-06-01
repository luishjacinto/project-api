import express from 'express'

import { userProductsDiscardControllers } from '../../../controllers'

const router = express.Router()

router.post('/user_products/:id/discard', userProductsDiscardControllers.discardUserProduct)
router.delete('/user_products/:id/discard', userProductsDiscardControllers.reiterateUserProduct)

export { router as userProductsDiscardRouter }
