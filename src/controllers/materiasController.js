const models = require('../models');

const encontrarMateria = (id, { onSuccess, onNotFound, onError }) => {
  models.materia
    .findOne({
      attributes: ['id', 'nombre', 'id_carrera'],
      where: { id },
    })
    .then((materia) => (materia ? onSuccess(materia) : onNotFound()))
    .catch(() => onError());
};

const obtenerMaterias = (req, res) => {
  models.materia
    .findAll({
      attributes: ['id_carrera', 'nombre'],
      include: [
        {
          as: 'Carrera',
          model: models.carrera,
          attributes: ['id', 'nombre'],
        },
      ],
    })
    .then((materias) => res.send(materias))
    .catch(() => res.sendStatus(500));
};

const crearMateria = (req, res) => {
  models.materia
    .create({ nombre: req.body.nombre, id_carrera: req.body.id_carrera })
    .then((materia) => res.status(201).send({ id: materia.id }))
    .catch((error) => {
      if (error == 'SequelizeUniqueConstraintError: Validation error') {
        res
          .status(400)
          .send('Bad request: existe otra materia con el mismo nombre');
      } else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`);
        res.sendStatus(500);
      }
    });
};

const obtenerYFiltrarMaterias = (req, res) => {
  let offset = parseInt(req.query.pagActual);
  let limit = parseInt(req.query.cantAVer);

  models.materia
    .findAll({
      offset: offset * limit,
      limit: limit,
    })
    .then((materias) => res.send(materias))
    .catch(() => res.sendStatus(500));
};

const obtenerUnaMateria = (req, res) => {
  encontrarMateria(req.params.id, {
    onSuccess: (materia) => res.send(materia),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

const actualizarMateria = (req, res) => {
  const onSuccess = (materia) =>
    materia
      .update({ nombre: req.body.nombre }, { fields: ['nombre', 'id_carrera'] })
      .then(() => res.sendStatus(200))
      .catch((error) => {
        if (error == 'SequelizeUniqueConstraintError: Validation error') {
          res
            .status(400)
            .send('Bad request: existe otra materia con el mismo nombre');
        } else {
          console.log(
            `Error al intentar actualizar la base de datos: ${error}`
          );
          res.sendStatus(500);
        }
      });
  encontrarMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

const eliminarMateria = (req, res) => {
  const onSuccess = (materia) =>
    materia
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  encontrarMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

module.exports = {
  obtenerMaterias,
  obtenerUnaMateria,
  obtenerYFiltrarMaterias,
  crearMateria,
  eliminarMateria,
  actualizarMateria,
};