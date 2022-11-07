const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../models");
const { validationResult } = require("express-validator");
const { obtenerMensajeDeError } = require("../utils/validatorErrorUtils");

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const encontrarYVerificarUsuario = (
  nombreUsuario,
  claveUsuario,
  { onSuccess, onNotFound, onError }
) => {
  models.usuario
    .findOne({
      attributes: ["id", "nombre", "clave"],
      where: { nombre: nombreUsuario },
    })
    .then(async (usuario) =>
      (await bcrypt.compare(claveUsuario, usuario.clave))
        ? onSuccess(usuario)
        : onNotFound()
    )
    .catch(() => onError());
};

const obtenerTokenUsuario = (req, res) => {
  let errors = validationResult(req);
  try {
    validationResult(req).throw();
    encontrarYVerificarUsuario(req.body.nombre, req.body.clave, {
      onSuccess: (usuario) => res.send(generarToken(usuario.id)),
      onNotFound: () => res.sendStatus(404),
      onError: () => res.sendStatus(500),
    });
  } catch (error) {
    res.status(400);
    if (!errors.isEmpty()) {
      res.send(obtenerMensajeDeError(errors));
    } else {
      res.send(error);
    }
  }
};

const crearUsuario = async (req, res) => {
  let errors = validationResult(req);
  try {
    validationResult(req).throw();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.clave, salt);

    models.usuario
      .create({ nombre: req.body.nombre, clave: hashedPassword })
      .then((usuario) => res.status(201).send({ id: usuario.id }))
      .catch((error) => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res
            .status(400)
            .send("Bad request: existe otro usuario con el mismo nombre");
        } else {
          console.log(
            `Error al intentar insertar en la base de datos: ${error}`
          );
          res.sendStatus(500);
        }
      });
  } catch (error) {
    res.status(400);
    if (!errors.isEmpty()) {
      res.send(obtenerMensajeDeError(errors));
    } else {
      res.send(error);
    }
  }
};

module.exports = { obtenerTokenUsuario, crearUsuario };
