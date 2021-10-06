var express = require('express');
var router = express()

/* GET home page. */
router.get('/', function(req, res) {
  res.send('hi')
});

module.exports = router;
