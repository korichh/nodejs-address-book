import { Router } from 'express'
const router = Router()
import actionController from '../../controllers/api/actionController.js'

router.get('/get', actionController.get)
router.get('/create', actionController.create)
router.get('/edit', actionController.edit)
router.get('/search', actionController.search)

export default router