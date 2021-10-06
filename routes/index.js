var express = require('express');
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res) {
  res.send('hii')
});

router.get('/get/params/:arepa', function(req, res) {
  res.send('hii'+req.agregar.arepa)
});

module.exports = router;
