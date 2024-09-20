import { query, matchedData, validationResult } from 'express-validator'
import user from '../../models/user.js'
const actionController = {}

actionController.get = [
    query('id').escape().trim().toInt(),
    async (req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) throw result.array()

            const data = matchedData(req);
            const userData = await user.getById(data)
            if (!userData) return res.status(404).json({ error: 'Not Found' })
            res.render('partials/action-get', { user: userData }, (err, html) => {
                if (err) throw err
                res.status(200).json({ actionHTML: html })
            })
        } catch (err) {
            res.status(500).json({ error: err.name })
            console.error(err)
        }
    }
]

actionController.create = [
    async (req, res) => {
        try {
            res.render('partials/action-create', (err, html) => {
                if (err) throw err
                res.status(200).json({ actionHTML: html })
            })
        } catch (err) {
            res.status(500).json({ error: err.name })
            console.error(err)
        }
    }
]

actionController.edit = [
    query('id').escape().trim().toInt(),
    async (req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) throw result.array()

            const data = matchedData(req);
            const userData = await user.getById(data)
            if (!userData) return res.status(404).json({ error: 'Not Found' })
            res.render('partials/action-edit', { user: userData }, (err, html) => {
                if (err) throw err
                res.status(200).json({ actionHTML: html })
            })
        } catch (err) {
            res.status(500).json({ error: err.name })
            console.error(err)
        }
    }
]

actionController.search = [
    query('s').optional().trim().toLowerCase(),
    async (req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) throw result.array()

            const data = matchedData(req);
            res.render('partials/action-search', { s: data.s }, (err, html) => {
                if (err) throw err
                res.status(200).json({ actionHTML: html })
            })
        } catch (err) {
            res.status(500).json({ error: err.name })
            console.error(err)
        }
    }
]

export default actionController