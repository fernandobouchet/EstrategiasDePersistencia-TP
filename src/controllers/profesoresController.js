const models = require("../models");
const { validationResult } = require("express-validator");
const { obtenerMensajeDeError } = require("../utils/validatorErrorUtils");

const encontrarProfesor = (idProfesor, { onSuccess, onNotFound, onError }) => {
  models.profesor
    .findOne({
      attributes: ["id", "nombre", "id_materia"],
      where: { id: idProfesor },
    })
    .then((profesor) => (profesor ? onSuccess(profesor) : onNotFound()))
    .catch(() => onError());
};

const obtenerProfesores = (req, res) => {
  models.profesor
    .findAll({
      attributes: ["id", "id_carrera", "nombre"],
      include: [
        {
          as: "carrera",
          model: models.carrera,
          attributes: ["id", "nombre"],
        },
      ],
    })
    .then((profesors) => res.send(profesors))
    .catch(() => res.sendStatus(500));
};

const obtenerYFiltrarProfesores = (req, res) => {
  let offset = parseInt(req.query.pagActual) || 0;
  let limit = parseInt(req.query.cantAVer) || 10;

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
    onNotFound: () => res.status(404).send("Profesor no encontrado"),
    onError: () => res.sendStatus(500),
  });
};

const crearProfesor = (req, res) => {
  let errors = validationResult(req);

  try {
    validationResult(req).throw();
    models.profesor
      .create({
        nombre: req.body.nombre,
        id_materia: req.body.id_materia,
      })
      .then((profesor) => res.status(201).send({ id: profesor.id }))
      .catch((error) => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res
            .status(400)
            .send("Bad request: existe otro profesor con el mismo nombre");
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

const actualizarProfesor = (req, res) => {
  let errors = validationResult(req);
  try {
    validationResult(req).throw();
    const onSuccess = (profesor) =>
      profesor
        .update(
          { nombre: req.body.nombre, id_materia: req.body.id_materia },
          { fields: ["nombre", "id_materia"] }
        )
        .then(() => res.sendStatus(200))
        .catch((error) => {
          if (error == "SequelizeUniqueConstraintError: Validation error") {
            res
              .status(400)
              .send("Bad request: existe otro profesor con el mismo nombre");
          } else {
            console.log(
              `Error al intentar actualizar la base de datos: ${error}`
            );
            res.sendStatus(500);
          }
        });
    encontrarProfesor(req.params.id, {
      onSuccess,
      onNotFound: () => res.status(404).send("Profesor no encontrado"),
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

const eliminarProfesor = (req, res) => {
  const onSuccess = (profesor) =>
    profesor
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  encontrarProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.status(404).send("Profesor no encontrado"),
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
