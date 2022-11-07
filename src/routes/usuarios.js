const express = require("express");
const router = express.Router();
const {
  obtenerTokenUsuario,
  crearUsuario,
} = require("../controllers/usuariosController");
const { validarCamposUsuario } = require("../validators/usuariosValidator");

router.get("/", validarCamposUsuario, obtenerTokenUsuario);

router.post("/", validarCamposUsuario, crearUsuario);

module.exports = router;
