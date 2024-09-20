import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import express from 'express'
import helmet from 'helmet'
import routes from './routes/index.js'

const app = express()
const PORT = process.env.PORT

app.use(helmet())

app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'views'))

app.use(express.static(path.join(process.cwd(), 'public'), { etag: false }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)
app.use((req, res) => {
    res.status(404).render('error', { title: 'Error 404', code: 404 })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})