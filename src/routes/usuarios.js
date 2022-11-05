const express = require('express');
const router = express.Router();
const {
  obtenerTokenUsuario,
  crearUsuario,
} = require('../controllers/usuariosController');

router.get('/', obtenerTokenUsuario);

router.post('/', crearUsuario);

module.exports = router;
