import { Router } from 'express'
const router = Router()
import indexController from '../controllers/indexController.js'

router.get('/', indexController.get)

export default router