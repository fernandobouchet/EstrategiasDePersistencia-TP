const express = require("express");
const router = express.Router();
const {
  obtenerAlumnos,
  crearAlumno,
  obtenerYFiltrarAlumnos,
  obtenerUnAlumno,
  actualizarAlumno,
  eliminarAlumno,
} = require("../controllers/alumnosController");
const { validarCamposAlumno } = require("../validators/alumnoValidators");

router.get("/", obtenerAlumnos);

router.post("/", validarCamposAlumno, crearAlumno);

router.get("/filtro", obtenerYFiltrarAlumnos);

router.get("/:id", obtenerUnAlumno);

router.put("/:id", validarCamposAlumno, actualizarAlumno);

router.delete("/:id", eliminarAlumno);

module.exports = router;
