const { body } = require("express-validator");

const validarCamposAlumno = [
  body("nombre")
    .exists()
    .withMessage("Alumno: Falta ingresar el campo de 'nombre'")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Alumno: El campo 'nombre' se encuentra vacio")
    .isString()
    .withMessage(
      "Alumno: El valor de 'nombre' debe ser un valor de tipo string"
    ),
  body("id_carrera")
    .exists()
    .withMessage("Alumno: Falta ingresar el campo de 'id_carrera'")
    .not()
    .isEmpty()
    .withMessage("Alumno: El campo 'id_carrera' se encuentra vacio")
    .isInt()
    .withMessage(
      "Alumno: El valor de 'id_carrera' debe ser un número de tipo entero"
    ),
];

module.exports = { validarCamposAlumno };
