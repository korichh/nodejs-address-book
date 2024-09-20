import { Router } from 'express'
const router = Router()
import userController from '../../controllers/api/userController.js'

router.get('/get', userController.get)
router.post('/create', userController.create)
router.put('/edit', userController.edit)
router.delete('/delete', userController.delete)

export default router