const express = require('express');
const router = express.Router();
const {
  obtenerCarreras,
  crearCarrera,
  obtenerYFiltrarCarreras,
  obtenerUnaCarrera,
  actualizarCarrera,
  eliminarCarrera,
} = require('../controllers/carrerasController');

router.get('/', obtenerCarreras);

router.post('/', crearCarrera);

router.get('/filtro', obtenerYFiltrarCarreras);

router.get('/:id', obtenerUnaCarrera);

router.put('/:id', actualizarCarrera);

router.delete('/:id', eliminarCarrera);

module.exports = router;
