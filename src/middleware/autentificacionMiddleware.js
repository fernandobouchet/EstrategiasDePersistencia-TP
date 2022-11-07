const jwt = require("jsonwebtoken");
const models = require("../models");
const { obtenerMensajeDeError } = require("../utils/validatorErrorUtils");
const { validationResult } = require("express-validator");
const { validarToken } = require("../validators/usuariosValidator");

const protejer = [
  validarToken,
  async (req, res, next) => {
    let errors = validationResult(req);
    let token;

    try {
      validationResult(req).throw();
      token = req.headers.token;
      let decodedToken;
      jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
          throw "Error: Token invalido";
        } else {
          decodedToken = decoded;
        }
      });
      const user = await models.usuario.findOne({
        attributes: ["id"],
        where: { id: decodedToken.id },
      });
      if (user) {
        return next();
      } else {
        throw "Error: No autorizado";
      }
    } catch (error) {
      res.status(401);
      if (!errors.isEmpty()) {
        res.send(obtenerMensajeDeError(errors));
      } else {
        res.send(error);
      }
    }
  },
];

module.exports = { protejer };
