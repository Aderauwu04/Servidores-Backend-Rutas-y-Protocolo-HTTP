var express = require('express');
var router = express.Router()

var casas = [
    {
    'pisos' : 2,
    'ventanas' : 4
  }
]
var edificios = [
  {
  'pisos' : 6,
  'ventanas' : 70
  },
  {
    'pisos' : 3,
    'ventanas' : 10
  }
]

let ciudad = casas.length + edificios.length;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    'Tamaño' : ciudad,
    'Casas' : casas.length,
    'Edificios' :edificios.length
  })
});

router.post('/post/query/casas', function (req, res) {
    casas.push({'pisos':req.query.pisos, 'ventanas': req.query.ventanas})
    res.json(casas)
})

router.post('/post/query/edificios', function (req, res) {
  edificios.push({'pisos':req.query.pisos, 'ventanas':req.query.ventanas})
  res.json(edificios)
})

router.get('/casas', function (req, res) {
  res.json(casas)
})
router.get('/edificios', function (req, res) {
  res.json(edificios)
})

console.log("Tamaño total = ", ciudad, ". Casas = ", casas, ". Edificios = ", edificios)

module.exports = router;
