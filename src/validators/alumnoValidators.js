const { body } = require("express-validator");

const validarCamposAlumno = [
  body("nombre")
    .exists()
    .withMessage("Alumno: Falta ingresar el campo de 'nombre'")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Alumno: El campo 'nombre' se encuentra vacio")
    .bail()
    .isString()
    .withMessage("Alumno: El valor de 'nombre' debe ser de tipo string")
    .bail(),
  body("id_carrera")
    .exists()
    .withMessage("Alumno: Falta ingresar el campo de 'id_carrera'")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Alumno: El campo 'id_carrera' se encuentra vacio")
    .bail()
    .isInt()
    .withMessage(
      "Alumno: El valor de 'id_carrera' debe ser un número de tipo entero"
    ),
];

module.exports = { validarCamposAlumno };
