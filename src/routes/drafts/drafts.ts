import express from 'express'

import {
  rootMiddlewares,
  draftsMiddlewares
} from '../../middlewares'
import { draftsControllers } from '../../controllers'

const router = express.Router()

router.use('/drafts', rootMiddlewares.setUserOnResponseLocalsByJWT)

router.get('/drafts', draftsControllers.getDrafts)
router.post('/drafts', draftsControllers.createDraft)

router.use('/drafts/:id', draftsMiddlewares.setDraftOnResponseLocalsById)

router.get('/drafts/:id', draftsControllers.getDraft)
router.put('/drafts/:id', draftsControllers.updateDraft)
router.delete('/drafts/:id', draftsControllers.deleteDraft)

export { router as draftsRouter }
