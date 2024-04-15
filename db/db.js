/**
 * 
 * @param {*} success 数据库连接成功的回调
 * @param {*} error 数据库连接失败的回调
 */

const { DB_HOST, DB_NAME, DB_PORT } = require('./config.js')

module.exports = function (success, error) {
    if (typeof error !== 'function') {
        error = () => {
            console.log('连接失败')
        }
    }
    const mongoose = require('mongoose')

    mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)

    mongoose.connection.once('open', async () => {
        success()
    })

    mongoose.connection.on('error', () => {
        error()
    })

    mongoose.connection.on('close', () => {
        console.log('连接关闭')
    })
}