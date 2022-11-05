const models = require('../models');

const encontrarAlumno = (id, { onSuccess, onNotFound, onError }) => {
  models.alumno
    .findOne({
      attributes: ['id', 'nombre', 'id_carrera'],
      where: { id },
    })
    .then((alumno) => (alumno ? onSuccess(alumno) : onNotFound()))
    .catch(() => onError());
};

const obtenerAlumnos = (req, res) => {
  models.alumno
    .findAll({
      attributes: ['id', 'id_carrera', 'nombre'],
      include: [
        {
          as: 'carrera',
          model: models.carrera,
          attributes: ['nombre'],
        },
      ],
    })
    .then((alumnos) => res.send(alumnos))
    .catch(() => res.sendStatus(500));
};

const crearAlumno = (req, res) => {
  models.alumno
    .create({
      nombre: req.body.nombre,
      id_carrera: req.body.id_carrera,
    })
    .then((alumno) => res.status(201).send({ id: alumno.id }))
    .catch((error) => {
      if (error == 'SequelizeUniqueConstraintError: Validation error') {
        res
          .status(400)
          .send('Bad request: existe otro alumno con el mismo nombre');
      } else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`);
        res.sendStatus(500);
      }
    });
};

const obtenerYFiltrarAlumnos = (req, res) => {
  let offset = parseInt(req.query.pagActual);
  let limit = parseInt(req.query.cantAVer);

  models.alumno
    .findAll({
      offset: offset * limit,
      limit: limit,
    })
    .then((alumnos) => res.send(alumnos))
    .catch(() => res.sendStatus(500));
};

const obtenerUnAlumno = (req, res) => {
  encontrarAlumno(req.params.id, {
    onSuccess: (alumno) => res.send(alumno),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

const actualizarAlumno = (req, res) => {
  const onSuccess = (alumno) =>
    alumno
      .update({ nombre: req.body.nombre }, { fields: ['nombre', 'id_carrera'] })
      .then(() => res.sendStatus(200))
      .catch((error) => {
        if (error == 'SequelizeUniqueConstraintError: Validation error') {
          res
            .status(400)
            .send('Bad request: existe otro alumno con el mismo nombre');
        } else {
          console.log(
            `Error al intentar actualizar la base de datos: ${error}`
          );
          res.sendStatus(500);
        }
      });
  encontrarAlumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

const eliminarAlumno = (req, res) => {
  const onSuccess = (alumno) =>
    alumno
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  encontrarAlumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

module.exports = {
  obtenerAlumnos,
  obtenerYFiltrarAlumnos,
  eliminarAlumno,
  actualizarAlumno,
  obtenerUnAlumno,
  crearAlumno,
};