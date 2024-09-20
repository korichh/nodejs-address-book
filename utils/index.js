import { promises as fs } from 'fs'
import path from 'path'
import multer from 'multer'
const pathDB = path.join(process.cwd(), 'db.json')
const pathImages = path.join(process.cwd(), 'public/images/users')

const readDB = async () => {
    try {
        const data = await fs.readFile(pathDB, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const writeDB = async (data) => {
    try {
        await fs.writeFile(pathDB, JSON.stringify(data), 'utf8');
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, pathImages),
        filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    })
})

export { readDB, writeDB, upload }