import express from 'express'
import { applicationConfigControllers } from '../../../controllers'

const router = express.Router()

router.put('/application/config', applicationConfigControllers.updateConfig)

export { router as applicationConfigRouter }
