const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const md5 = require('md5')

const { successCode, errCodes } = require('../../constants')
const UserModel = require('../../db/models/UserModel')
const { SECRETKEY } = require('../../db/config')

// 注册用户
router.post('/register', async (req, res, next) => {
    const { username, password } = req.body
    // 对密码进行加密处理
    const hashedPassword = md5(password);
    try {
        let result = await UserModel.findOne({
            username
        })
        if (result) {
            return res.json({
                code: errCodes.EXISTED_USER,
                msg: '用户名已注册',
                data: null
            });
        }
    } catch (error) {
        return res.json({
            code: errCodes.REG_ERROR,
            msg: 'register fail error ~',
            data: null
        });
    }
    try {
        let result = await UserModel.create({
            username,
            password: hashedPassword
        })
        res.json({
          code: successCode.SUCCESS_CODE,
          msg: 'register success~',
          data: result
        });
    } catch (error) {
        res.json({
            code: errCodes.REG_ERROR,
            msg: 'register fail error ~',
            data: null
        });
    }
});

// 用户登录
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    const hashedPassword = md5(password);
    try {
        let user = await UserModel.findOne({
            username
        })
        if (!user) {
            return res.json({
                code: errCodes.USER_NOTFIND_ERROR,
                msg: 'Not find user~',
                data: null
            });
        }
        if (user.password !== hashedPassword) {
            return res.json({
                code: errCodes.PASSWORD_ERROR,
                msg: 'Password is not right~',
                data: null
            });
        }

        // 保存session
        req.session.username = username
        req.session.uid = user._id

        // 创建token
        let token = jwt.sign({
            username
        }, SECRETKEY, {
            expiresIn: 60 * 60 * 24 * 7 // 单位是s
        })
        return res.json({
          code: successCode.SUCCESS_CODE,
          msg: 'login success~',
          data: token
        });
    } catch (error) {
        res.json({
            code: errCodes.LOGIN_FAIL,
            msg: 'login fail error ~',
            data: null
        });
    }
});

// 退出登录
router.post('/logout', async (req, res, next) => {
    // 销毁session
    req.session.destroy(() => {
        res.json({
            code: successCode.SUCCESS_CODE,
            msg: 'logout success~',
            data: null
        });
    })
})

module.exports = router;
