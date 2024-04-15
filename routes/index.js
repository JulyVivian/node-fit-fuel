var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/err', function(req, res, next) {
  console.log('++++res++++++', res)
  res.render('error', { errCode: 'Express' });
});

module.exports = router;
