/** 
 * 
 * jsonwebtoken
 * */ 
const jwt = require('jsonwebtoken')

const { SECRETKEY } = require('../db/config')
const { errCodes } = require('../constants')

module.exports = function (req, res, next) {
    const { token } = req.body
    if (!token) {
        return res.json({
            code: errCodes.TOKEN_EMPTY,
            msg: 'token is missing',
            data: null
        })
    }
    jwt.verify(token, SECRETKEY, (err, data) => {
        if (err) {
            res.json({
                code: errCodes.VALIDATE_ERROR,
                msg: '校验失败',
                data: null
            })
            return
        }
        console.log('校验成功')
        next()
    })
}