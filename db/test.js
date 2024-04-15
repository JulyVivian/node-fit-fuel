const db = require('./db.js')
const UserModel = require('./models/UserModel.js')

db(async () => {

    try {
        let result = await UserModel.create({
            username: 'test',
            password: 'admin'
        })
        console.log('sucess::', result)
    } catch (error) {
        console.log('create fail')
    }
})
