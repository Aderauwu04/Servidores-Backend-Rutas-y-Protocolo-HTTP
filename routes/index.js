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
  },
  {
    'id': 'parques',
    'estructuras': []
  },
  {
    'id': 'apartamentos',
    'estructuras': []
  },
  {
    'id': 'carreteras',
    'estructuras': []
  },
  {
    'id': 'puentes',
    'estructuras': []
  },
  {
    'id': 'zonas comerciales',
    'estructuras': [ ]
  }
];

/* ======= Funciones =======*/
function eliminar(ciudad, id, itemid) {
  for (let i = 0; i < ciudad.length; i++) {
    if (ciudad[i].id == id){
      for (let j = 0; j < ciudad[i].estructuras.length; j++) {
        if (ciudad[i].estructuras[j].id === itemid){
          return ciudad[i].estructuras.splice(j, 1)
        }
      }
    }
  }
}

/* ======= Metodos GET =======*/
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    'TotalE' :  ciudad.length,
  });
});

/* Metodo GET para ver especificamente una item de ciudad o para ver toda la ciudad*/
router.get('/ciudad/:id', function (req, res) {
  const id = ciudad.filter( i => i.id === req.params.id);
  res.json(id)
});

router.get('/ciudad', function (req, res) {
  res.json(ciudad)
});

/* ======= Metodos POST =======*/
/* Metodos POST para un item de estructura por query */
/* ejemplo; http://localhost:8080/query/casas?id=2A&pisos=1&ventanas=6 */
router.post('/query/item/:id',
  function (req, res, next) {
    ciudad.forEach(i => {
      if (i.id === req.params.id) {
        i.estructuras.push(req.query)
      }
    });
    next();
  },
  function (req, res) {
    if (!req.query.id) {
      res.send("¡listo! Se ha agregado una nueva estructura, pero parece que no tiene id, esto puede causar problemas para editarla o eliminarla, te recomendamos añarle un id a las proximas estructuras que guardes ")
    }
    else{
      res.send("¡listo! se agrego exitosamente!")
    }
  }
);

/* Metodo POST usando Body */
router.post('/body/item/:id',
  function (req, res, next) {
    ciudad.forEach(i => {
      if (req.params.id === i.id) {
        i.estructuras.push(req.body)
      }
    });
    next();
  },
  function (req, res) {
    if (!req.body.id) {
      res.send("¡listo! Se ha agregado una nueva estructura, pero parece que no tiene id, esto puede causar problemas para editarla o eliminarla, te recomendamos añarle un id a las proximas estructuras que guardes ")
    }
    else{
      res.send("¡listo! se agrego exitosamente!")
    }
  }
);

/* Metodo POST para añadir una estructura en la ciudad */
router.post('/ciudad/:id', function (req, res) {
  ciudad.push({'id': req.params.id, 'estructuras': [] })
  res.json(ciudad)
});

/* ======= Metodos DELETE =======*/
/* Borrar un item de una estructura,
  es necesario el params con el id del tipo de estructura
  que se desea eliminar, y el params para especificar que
  estructura por id se va a eliminar
  ejemplo; http://localhost:8080/delete/item/casas/1A*/
router.delete('/delete/item/:id/:itemid',
  function (req, res, next) {
    eliminar(ciudad, req.params.id, req.params.itemid)
    next();
  },
  function (req, res) {
    res.send("¡eliminado "+req.params.itemid+" de "+req.params.id+" exitosamente!")
  }
);

/* Borrar un item de la ciudad */
router.delete('/delete/ciudad/:id',
  function (req, res, next) {
    for (let i = 0; i < ciudad.length; i++) {
      if (ciudad[i].id === req.params.id) {
        ciudad.splice(i, 1)
      }
    }
    next()
  },
  function(req, res) {
    res.send("¡eliminado "+req.params.id+" de la ciudad")
  }
);

/* ======= Metodos PUT =======*/
/* Editar el id de un item de ciudad */
router.put('/ciudad/:id/:cambio',
  function (req, res, next) {
    ciudad.forEach(i => {
      if (i.id === req.params.id) {
        i.id = req.params.cambio
      }
    });
    next();
  },
  function (req, res) {
    res.send(req.params.id+" ahora es "+ req.params.cambio)
  }
);

/* Editar el id de una estructura */
router.put('/estructura/:id/:itemid/:cambio',
  function (req, res, next) {
    ciudad.forEach(i => {
      if (i.id === req.params.id) {
        i.estructuras.forEach(j => {
          if (j.id == req.params.itemid) {
            j.id = req.params.cambio
          }
        })
      }
    })
    next();
  },
  function (req, res) {
    res.send("el "+req.params.id+" que tiene "+req.params.itemid+ " ahora es "+ req.params.cambio)
  }
);

module.exports = router;
