import express from 'express'
import { rootControllers } from '../../controllers'

const router = express.Router()

router.post('/signup', rootControllers.signUp)
router.post('/signin', rootControllers.signIn)
router.get('/verify_user/:token', rootControllers.verifyUser)

export { router as userRouter }
