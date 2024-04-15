const express = require('express');
const router = express.Router();

const ConsumptionModel = require('../../db/models/ConsumptionModel')
const { successCode, errCodes } = require('../../constants')
const tokenMiddleware = require('../../middlewares/tokenMiddleware')
const sessionMiddleware = require('../../middlewares/sessionMiddleware')

// 获取我的运动健康记录
router.get('/tracker', sessionMiddleware, async (req, res, next) => {
  try {
    let result = await ConsumptionModel.find()
    res.json({
      code: successCode.SUCCESS_CODE,
      msg: 'get trackers success~',
      data: result
    });
  } catch (error) {
    res.json({
      code: errCodes.GET_LIST_ERROR,
      msg: 'get trackers fail~',
      data: null
    });
  }
});

// 新增一条健康记录
router.post('/tracker', async (req, res, next) => {
  try {
    let result = await ConsumptionModel.create(req.body)
    res.json({
      code: successCode.SUCCESS_CODE,
      msg: 'create tracker-log success~',
      data: result
    });
  } catch (error) {
    res.json({
      code: errCodes.CREATE_ERROR,
      msg: 'create tracker-log fail~',
      data: null
    });
  }
});

// 更新某条运动健康记录
router.patch('/tracker/:id', tokenMiddleware, async (req, res, next) => {
  const { id } = req.params
  try {
    let result = await ConsumptionModel.updateOne({ _id: id }, req.body)
    res.json({
      code: successCode.SUCCESS_CODE,
      msg: 'update tracker-log success~',
      data: result
    });
  } catch (error) {
    res.json({
      code: errCodes.UPDATE_ERROR,
      msg: 'update tracker-log fail~',
      data: null
    });
  }
});

// 删除某条运动健康记录
router.delete('/tracker/:id', tokenMiddleware, async (req, res, next) => {
  const { id } = req.params
  try {
    let result = await ConsumptionModel.deleteOne({ _id: id })
    res.json({
      code: successCode.SUCCESS_CODE,
      msg: 'delete tracker-log success~',
      data: result
    });
  } catch (error) {
    res.json({
      code: errCodes.DELETE_ERROR,
      msg: 'delete tracker-log fail~',
      data: null
    });
  }
});

module.exports = router;
