const { body } = require("express-validator");

const validarCamposMateria = [
  body("nombre")
    .exists()
    .withMessage("Materia: Falta ingresar el campo de 'nombre'")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Materia: El campo 'nombre' se encuentra vacio")
    .bail()
    .isString()
    .withMessage("Materia: El valor de 'nombre' debe ser de tipo string")
    .bail(),
  body("id_carrera")
    .exists()
    .withMessage("Materia: Falta ingresar el campo de 'id_carrera'")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Materia: El campo 'id_carrera' se encuentra vacio")
    .bail()
    .isInt()
    .withMessage(
      "Materia: El valor de 'id_carrera' debe ser un número de tipo entero"
    ),
];

module.exports = { validarCamposMateria };
