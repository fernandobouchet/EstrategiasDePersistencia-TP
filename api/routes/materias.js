var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', (req, res) => {
  models.materia
    .findAll({
      attributes: ['id_carrera', 'nombre'],
      include: [
        {
          as: 'Carrera',
          model: models.carrera,
          attributes: ['id', 'nombre'],
        },
      ],
    })
    .then((materias) => res.send(materias))
    .catch(() => res.sendStatus(500));
});

module.exports = router;
