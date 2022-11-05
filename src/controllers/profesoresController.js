const models = require('../models');

const encontrarProfesor = (id, { onSuccess, onNotFound, onError }) => {
  models.profesor
    .findOne({
      attributes: ['id', 'nombre', 'id_materia'],
      where: { id },
    })
    .then((profesor) => (profesor ? onSuccess(profesor) : onNotFound()))
    .catch(() => onError());
};

const obtenerProfesores = (req, res) => {
  models.profesor
    .findAll({
      attributes: ['id', 'id_materia', 'nombre'],
      include: [
        {
          as: 'materias',
          model: models.materia,
          attributes: ['nombre', 'id_carrera'],
        },
      ],
    })
    .then((profesors) => res.send(profesors))
    .catch(() => res.sendStatus(500));
};

const obtenerYFiltrarProfesores = (req, res) => {
  let offset = parseInt(req.query.pagActual);
  let limit = parseInt(req.query.cantAVer);

  models.profesor
    .findAll({
      offset: offset * limit,
      limit: limit,
    })
    .then((profesores) => res.send(profesores))
    .catch(() => res.sendStatus(500));
};

const obtenerUnProfesor = (req, res) => {
  encontrarProfesor(req.params.id, {
    onSuccess: (profesor) => res.send(profesor),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

const crearProfesor = (req, res) => {
  models.profesor
    .create({
      nombre: req.body.nombre,
      id_materia: req.body.id_materia,
    })
    .then((profesor) => res.status(201).send({ id: profesor.id }))
    .catch((error) => {
      if (error == 'SequelizeUniqueConstraintError: Validation error') {
        res
          .status(400)
          .send('Bad request: existe otro profesor con el mismo nombre');
      } else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`);
        res.sendStatus(500);
      }
    });
};

const actualizarProfesor = (req, res) => {
  const onSuccess = (profesor) =>
    profesor
      .update({ nombre: req.body.nombre }, { fields: ['nombre', 'id_materia'] })
      .then(() => res.sendStatus(200))
      .catch((error) => {
        if (error == 'SequelizeUniqueConstraintError: Validation error') {
          res
            .status(400)
            .send('Bad request: existe otro profesor con el mismo nombre');
        } else {
          console.log(
            `Error al intentar actualizar la base de datos: ${error}`
          );
          res.sendStatus(500);
        }
      });
  encontrarProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

const eliminarProfesor = (req, res) => {
  const onSuccess = (profesor) =>
    profesor
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  encontrarProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

module.exports = {
  obtenerProfesores,
  crearProfesor,
  eliminarProfesor,
  actualizarProfesor,
  obtenerUnProfesor,
  obtenerYFiltrarProfesores,
};
