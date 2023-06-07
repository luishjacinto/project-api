import express from 'express'
import { applicationConfigRouter } from './config/config'
import { rootMiddlewares } from '../../middlewares'

const router = express.Router()

router.use('/application', rootMiddlewares.setUserOnResponseLocalsByJWT)
router.use(applicationConfigRouter)

export { router as applicationRouter }
