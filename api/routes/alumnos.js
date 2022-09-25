const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
  models.alummo
    .findAll({
      attributes: ['id_carrera', 'nombre'],
    })
    .then((alumnos) => res.send(alumnos))
    .catch(() => res.sendStatus(500));
});

module.exports = router;
