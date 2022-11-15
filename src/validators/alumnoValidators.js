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
  body("id_materia")
    .exists()
    .withMessage("Alumno: Falta ingresar el campo de 'id_materia'")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Alumno: El campo 'id_materia' se encuentra vacio")
    .bail()
    .isInt()
    .withMessage(
      "Alumno: El valor de 'id_materia' debe ser un número de tipo entero"
    ),
];

module.exports = { validarCamposAlumno };
