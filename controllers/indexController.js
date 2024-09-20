import { query, matchedData, validationResult } from 'express-validator'
import user from '../models/user.js'
const indexController = {}

indexController.get = [
    query('s').optional().trim().toLowerCase(),
    async (req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) throw result.array()

            const data = matchedData(req);
            const userData = await user.getAll(data)
            res.status(200).render('index', { title: 'Address Book', users: userData })
        } catch (err) {
            res.status(500).render('error', { title: 'Error 500', code: 500 })
            console.error(err)
        }
    }
]

export default indexController