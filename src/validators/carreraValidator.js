const { body } = require("express-validator");

const validarCampoCarrera = [
  body("nombre")
    .exists()
    .withMessage("Materia: Falta ingresar el campo de 'nombre'")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Materia: El campo 'nombre' se encuentra vacio")
    .bail()
    .isString()
    .withMessage("Materia: El valor de 'nombre' debe ser de tipo string"),
];

module.exports = { validarCampoCarrera };
