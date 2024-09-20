import { Router } from 'express'
const router = Router()
import userRoutes from './userRoutes.js'
import actionRoutes from './actionRoutes.js'

router.use('/action', actionRoutes)
router.use('/user', userRoutes)

export default router