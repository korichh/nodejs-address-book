import { readDB, writeDB } from '../utils/index.js'
const user = {}

user.getAll = async (data = {}) => {
    let db = await readDB()
    if (data.s) {
        return db.filter(user => {
            let toSearch = [
                user.fullname,
                user.home.number,
                user.home.address,
                user.work.number,
                user.work.address,
            ]
            return toSearch.some(val => String(val).toLowerCase().includes(data.s))
        })
    }
    return db
}

user.getById = async (data) => {
    let db = await readDB()
    return db.find(user => user.id == data.id)
}

user.edit = async (data) => {
    let db = await readDB()
    let userSchema = {
        id: data.id,
        avatar: data.avatar,
        fullname: data.fullname,
        home: {
            number: data['phone-number'],
            address: data['home-address']
        },
        work: {
            number: data['work-number'],
            address: data['work-address']
        },
        about: data.about
    }
    const edited = db.filter((user, i, arr) => {
        if (user.id == data.id) {
            arr[i] = userSchema
            return true
        }
        return false
    })
    writeDB(db)
    return [edited[0], db]
}

user.create = async (data) => {
    let db = await readDB()
    let userSchema = {
        id: Math.random().toString(10).slice(2),
        avatar: data.avatar,
        fullname: data.fullname,
        home: {
            number: data['phone-number'],
            address: data['home-address']
        },
        work: {
            number: data['work-number'],
            address: data['work-address']
        },
        about: data.about
    }
    db.push(userSchema)
    writeDB(db)
    return [userSchema, db]
}

user.delete = async (data) => {
    let db = await readDB()
    const deleted = db.filter((user, i, arr) => {
        if (user.id == data.id) {
            arr.splice(i, 1);
            return true
        }
        return false
    })
    writeDB(db)
    return [deleted[0], db]
}

export default user