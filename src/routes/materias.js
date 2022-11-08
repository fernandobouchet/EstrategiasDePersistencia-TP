const express = require("express");
const router = express.Router();
const {
  crearMateria,
  obtenerMaterias,
  obtenerYFiltrarMaterias,
  obtenerUnaMateria,
  actualizarMateria,
  eliminarMateria,
} = require("../controllers/materiasController");
const { validarCamposMateria } = require("../validators/materiaValidator");

router.get("/", obtenerMaterias);

router.post("/", validarCamposMateria, crearMateria);

router.get("/filtro", obtenerYFiltrarMaterias);

router.get("/:id", obtenerUnaMateria);

router.put("/:id", validarCamposMateria, actualizarMateria);

router.delete("/:id", eliminarMateria);

module.exports = router;
