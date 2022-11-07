const express = require("express");
const router = express.Router();
const {
  obtenerProfesores,
  crearProfesor,
  eliminarProfesor,
  actualizarProfesor,
  obtenerUnProfesor,
  obtenerYFiltrarProfesores,
} = require("../controllers/profesoresController");
const { validarCamposProfesor } = require("../validators/profesorValidator");

router.get("/", obtenerProfesores);

router.post("/", validarCamposProfesor, crearProfesor);

router.get("/filtro", obtenerYFiltrarProfesores);

router.get("/:id", obtenerUnProfesor);

router.put("/:id", validarCamposProfesor, actualizarProfesor);

router.delete("/:id", eliminarProfesor);

module.exports = router;
