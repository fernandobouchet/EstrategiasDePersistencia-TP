const { body } = require("express-validator");

const validarCamposProfesor = [
  body("nombre")
    .exists()
    .withMessage("Profesor: Falta ingresar el campo de 'nombre'")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Profesor: El campo 'nombre' se encuentra vacio")
    .bail()
    .isString()
    .withMessage("Profesor: El valor de 'nombre' debe ser de tipo string")
    .bail(),
  body("id_materia")
    .exists()
    .withMessage("Profesor: Falta ingresar el campo de 'id_materia'")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Profesor: El campo 'id_materia' se encuentra vacio")
    .bail()
    .isInt()
    .withMessage(
      "Profesor: El valor de 'id_materia' debe ser un número de tipo entero"
    ),
];

module.exports = { validarCamposProfesor };
