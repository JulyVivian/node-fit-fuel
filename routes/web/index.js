const express = require('express');
const router = express.Router();

router.get('/list', (req, res, next) => {
    res.send('Hello node~')
})

module.exports = router;
