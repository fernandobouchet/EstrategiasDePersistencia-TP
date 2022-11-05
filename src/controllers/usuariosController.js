const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const models = require('../models');

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const encontrarYVerificarUsuario = (
  nombre,
  clave,
  { onSuccess, onNotFound, onError }
) => {
  models.usuario
    .findOne({
      attributes: ['id', 'nombre', 'clave'],
      where: { nombre },
    })
    .then(async (usuario) => await bcrypt.compare(clave, usuario.clave))
    .then((usuario) => (usuario ? onSuccess(usuario) : onNotFound()))
    .catch(() => onError());
};

const obtenerTokenUsuario = (req, res) => {
  encontrarYVerificarUsuario(req.body.nombre, req.body.clave, {
    onSuccess: (usuario) => res.send(generarToken(usuario.id)),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

const crearUsuario = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.clave, salt);

  models.usuario
    .create({ nombre: req.body.nombre, clave: hashedPassword })
    .then((usuario) => res.status(201).send({ id: usuario.id }))
    .catch((error) => {
      if (error == 'SequelizeUniqueConstraintError: Validation error') {
        res
          .status(400)
          .send('Bad request: existe otro usuario con el mismo nombre');
      } else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`);
        res.sendStatus(500);
      }
    });
};

module.exports = { obtenerTokenUsuario, crearUsuario };
