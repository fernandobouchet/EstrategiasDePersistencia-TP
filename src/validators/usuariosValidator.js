const { header, body } = require("express-validator");

const validarToken = [
  header("token")
    .exists()
    .withMessage("Falta ingresar el Token")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No se encuentra el valor del token")
    .bail()
    .isJWT()
    .withMessage("El token ingresado es inválido"),
];

const validarCamposUsuario = [
  body("nombre")
    .exists()
    .withMessage("Usuario: Falta ingresar el campo de 'nombre'")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Usuario: El campo 'nombre' se encuentra vacio")
    .bail()
    .isString()
    .withMessage("Usuario: El valor de 'nombre' debe ser de tipo string")
    .bail(),
  body("clave")
    .exists()
    .withMessage("Usuario: Falta ingresar el campo de 'clave'")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Usuario: El campo 'clave' se encuentra vacio")
    .bail()
    .isString()
    .withMessage("Usuario: El valor de 'clave' debe ser de tipo string"),
];
module.exports = { validarToken, validarCamposUsuario };
