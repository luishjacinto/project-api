import express from 'express'
import { rootControllers } from '../../controllers'
import { rootMiddlewares } from '../../middlewares'

const router = express.Router()

router.use('/signup', rootMiddlewares.verifyIfApplicationIsNotUnderMaintenance)
router.post('/signup', rootControllers.signUp)

router.post('/signin', rootControllers.signIn)

export { router as userRouter }
