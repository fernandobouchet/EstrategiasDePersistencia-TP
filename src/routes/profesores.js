const express = require('express');
const router = express.Router();
const {
  obtenerProfesores,
  crearProfesor,
  eliminarProfesor,
  actualizarProfesor,
  obtenerUnProfesor,
  obtenerYFiltrarProfesores,
} = require('../controllers/profesoresController');

router.get('/', obtenerProfesores);

router.post('/', crearProfesor);

router.get('/filtro', obtenerYFiltrarProfesores);

router.get('/:id', obtenerUnProfesor);

router.put('/:id', actualizarProfesor);

router.delete('/:id', eliminarProfesor);

module.exports = router;
