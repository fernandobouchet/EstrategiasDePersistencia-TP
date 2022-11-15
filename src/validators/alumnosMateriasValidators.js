const { body } = require("express-validator");

const validarCamposAlumnosMaterias = [
  body("id_alumno")
    .exists()
    .withMessage("Alumno: Falta ingresar el campo de 'id_alumno'")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Alumno: El campo 'id_alumno' se encuentra vacio")
    .bail()
    .isInt()
    .withMessage(
      "Alumno: El valor de 'id_alumno'debe ser un número de tipo entero"
    )
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

module.exports = { validarCamposAlumnosMaterias };
