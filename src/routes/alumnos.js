const express = require('express');
const router = express.Router();
const {
  obtenerAlumnos,
  crearAlumno,
  obtenerYFiltrarAlumnos,
  obtenerUnAlumno,
  actualizarAlumno,
  eliminarAlumno,
} = require('../controllers/alumnosController');

router.get('/', obtenerAlumnos);

router.post('/', crearAlumno);

router.get('/filtro', obtenerYFiltrarAlumnos);

router.get('/:id', obtenerUnAlumno);

router.put('/:id', actualizarAlumno);

router.delete('/:id', eliminarAlumno);

module.exports = router;
