const express = require("express");
const router = express.Router();
const {
  obtenerCarreras,
  crearCarrera,
  obtenerYFiltrarCarreras,
  obtenerUnaCarrera,
  actualizarCarrera,
  eliminarCarrera,
} = require("../controllers/carrerasController");
const { validarCampoCarrera } = require("../validators/carreraValidator");

router.get("/", obtenerCarreras);

router.post("/", validarCampoCarrera, crearCarrera);

router.get("/filtro", obtenerYFiltrarCarreras);

router.get("/:id", obtenerUnaCarrera);

router.put("/:id", validarCampoCarrera, actualizarCarrera);

router.delete("/:id", eliminarCarrera);

module.exports = router;
