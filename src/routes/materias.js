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

router.get("/", obtenerMaterias);

router.post("/", crearMateria);

router.get("/filtro", obtenerYFiltrarMaterias);

router.get("/:id", obtenerUnaMateria);

router.put("/:id", actualizarMateria);

router.delete("/:id", eliminarMateria);

module.exports = router;
