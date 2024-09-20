import { Router } from 'express'
const router = Router()
import indexRoutes from './indexRoutes.js'
import apiRoutes from './api/index.js'

router.use('/', indexRoutes)
router.use('/api', apiRoutes)

export default router