const express = require("express");
const router = express.Router();
const {
  obtenerAlumnosMaterias,
  crearAlumnosMaterias,
  obtenerYFiltrarAlumnosMaterias,
  obtenerUnAlumnoMateria,
  actualizarAlumnoMateria,
  eliminaAlumnoMateria,
} = require("../controllers/alumnos_materiasController");
const {
  validarCamposAlumnosMaterias,
} = require("../validators/alumnosMateriasValidators");

router.get("/", obtenerAlumnosMaterias);

router.post("/", validarCamposAlumnosMaterias, crearAlumnosMaterias);

router.get("/filtro", obtenerYFiltrarAlumnosMaterias);

router.get("/:id", obtenerUnAlumnoMateria);

router.put("/:id", validarCamposAlumnosMaterias, actualizarAlumnoMateria);

router.delete("/:id", eliminaAlumnoMateria);

module.exports = router;
