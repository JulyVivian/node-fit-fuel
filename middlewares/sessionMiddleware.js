/** 
 * 
 * 检测session是否存在
 * */

const { SECRETKEY } = require('../db/config')
const { errCodes } = require('../constants')

module.exports = function (req, res, next) {
    // 检测session是否存在用户数据
    const { username } = req.session
    if (!username) {
        return res.json({
            code: errCodes.SESSION_ERROR,
            msg: 'session is not existed',
            data: null
        })
    }
    next()
}