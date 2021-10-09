var express = require('express');
var router = express.Router();

var ciudad = [
  {
    'id': 'casas',
    'estructuras': [
      {
        'id' : '1A',
        'pisos' : 2,
        'ventanas' : 4
      }
    ]
  },
  {
    'id': 'edificios',
    'estructuras': [
      {
        'id' :'2A',
        'pisos' : 6,
        'ventanas' : 70
      },
      {
        'id': '3B',
        'pisos' : 3,
        'ventanas' : 10
      }
    ]
  }
];

/* ======= Metodos GET =======*/
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    'Tamaño' :  ciudad.forEach(i => { return i}),
    'Edificaciones' : edicicaciones= ciudad.filter(i => i.id).join(", ")
  });
});

/* Metodo GET para ver especificamente una estructura */
router.get('/estructura/:id', function (req, res) {
  const id = ciudad.filter( i => i.id === req.params.id);
  res.json(id)
});

/* ======= Metodos POST =======*/
/* Metodos POST por query */
/* ejemplo; http://localhost:8080/query/casas?id=2A&pisos=1&ventanas=6 */
router.post('/query/:id', function (req, res) {
  ciudad.forEach(i => {
    if (req.params.id === i.id) {
      i.estructuras.push(req.query)
      res.json(i.estructuras)
    }
  });
});

/* Metodo POST usando Body */
router.post('/body/:id', function (req, res) {
  ciudad.forEach(i => {
    if (req.params.id === i.id) {
      i.estructuras.push(req.body)
      res.json(i.estructuras)
    }
  });
});

/* Metodo POST para añadir una estructura en la ciudad */
router.post('/ciudad/:id', function (req, res) {
  ciudad.push({'id': req.params.id, 'estructuras': [] })
  res.json(ciudad)
});

/* ======= Metodos DELETE =======*/
/* Borrar el ultimo item */
router.delete('/delete/item/:id', function (req, res) {
  ciudad.forEach(i => {
    if (req.params.id === i.id) {
      i.estructuras.pop()
      res.status(200)
      res.send("Se ha eliminado el ultimo item de "+ req.params.id+" puede rectificar al ir a /estructura/"+req.params.id+" con el metodo GET")
    }
  });
});
/* Borrar el ultimo item */


/* ======= Metodos DELETE =======*/


module.exports = router;
