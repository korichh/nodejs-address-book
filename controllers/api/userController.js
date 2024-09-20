import { query, body, matchedData, validationResult } from 'express-validator'
import { upload } from '../../utils/index.js'
import sharp from 'sharp'
import path from 'path'
import { promises as fs } from 'fs'
import user from '../../models/user.js'
const userController = {}

userController.get = [
    query('s').optional().trim().toLowerCase(),
    async (req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) throw result.array()

            const data = matchedData(req)
            const userData = await user.getAll(data)
            res.render('partials/users', { users: userData }, (err, html) => {
                if (err) throw err
                res.status(200).json({ usersHTML: html })
            })
        } catch (err) {
            res.status(500).json({ error: err.name })
            console.error(err)
        }
    }
]

userController.create = [
    upload.single('avatar'),
    body('fullname').trim(),
    body('phone-number').trim(),
    body('home-address').trim(),
    body('work-number').trim(),
    body('work-address').trim(),
    body('about').trim(),
    async (req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) throw result.array()

            const data = matchedData(req)
            data.avatar = 'default.webp'
            if (req.file) {
                data.avatar = `${req.file.filename.split('.')[0]}.webp`
                await sharp(req.file.path)
                    .resize({ width: 150, height: 150, fit: 'cover' })
                    .toFormat('webp')
                    .toFile(path.join(process.cwd(), 'public/images/users', data.avatar))
                await fs.unlink(req.file.path)
            }
            const [userData, users] = await user.create(data)
            if (!userData || !users) return res.status(404).json({ error: 'Not Found' })
            res.render('partials/users', { users: users }, (err, html) => {
                if (err) throw err
                res.status(200).json({ message: `${userData.fullname} was created!`, usersHTML: html })
            })
        } catch (err) {
            res.status(500).json({ error: err.name })
            console.error(err)
        }
    }
]

userController.edit = [
    query('id').escape().trim().toInt(),
    upload.single('avatar'),
    body('avatar-file').customSanitizer(i => Boolean(i)),
    body('fullname').trim(),
    body('phone-number').trim(),
    body('home-address').trim(),
    body('work-number').trim(),
    body('work-address').trim(),
    body('about').trim(),
    async (req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) throw result.array()

            const data = matchedData(req)
            data.avatar = 'default.webp'
            const oldAvatar = (await user.getById(data)).avatar
            if (req.file) {
                data.avatar = `${req.file.filename.split('.')[0]}.webp`
                await sharp(req.file.path)
                    .resize({ width: 150, height: 150, fit: 'cover' })
                    .toFormat('webp')
                    .toFile(path.join(process.cwd(), 'public/images/users', data.avatar))
                await fs.unlink(req.file.path)
                if (oldAvatar != 'default.webp') await fs.unlink(path.join(process.cwd(), 'public/images/users', oldAvatar))
            } else if (data['avatar-file']) {
                data.avatar = oldAvatar
            } else {
                if (oldAvatar != 'default.webp') await fs.unlink(path.join(process.cwd(), 'public/images/users', oldAvatar))
            }
            const [userData, users] = await user.edit(data)
            if (!userData || !users) return res.status(404).json({ error: 'Not Found' })
            res.render('partials/users', { users: users }, (err, html) => {
                if (err) throw err
                res.status(200).json({ message: `${userData.fullname} was edited!`, usersHTML: html })
            })
        } catch (err) {
            res.status(500).json({ error: err.name })
            console.error(err)
        }
    }
]

userController.delete = [
    query('id').escape().trim().toInt(),
    async (req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) throw result.array()

            const data = matchedData(req);
            const [userData, users] = await user.delete(data)
            if (userData.avatar != 'default.webp') await fs.unlink(path.join(process.cwd(), 'public/images/users', userData.avatar))
            if (!userData) return res.status(404).json({ error: 'Not Found' })
            res.render('partials/users', { users }, (err, html) => {
                if (err) throw err
                res.status(200).json({ message: `${userData.fullname} was deleted!`, usersHTML: html })
            })
        } catch (err) {
            res.status(500).json({ error: err.name })
            console.error(err)
        }
    }
]

export default userController