const models = require("../models");
const { validationResult } = require("express-validator");
const { obtenerMensajeDeError } = require("../utils/validatorErrorUtils");

const encontrarMateria = (id, { onSuccess, onNotFound, onError }) => {
  models.materia
    .findOne({
      attributes: ["id", "nombre", "id_carrera"],
      where: { id },
    })
    .then((materia) => (materia ? onSuccess(materia) : onNotFound()))
    .catch(() => onError());
};

const obtenerMaterias = (req, res) => {
  models.materia
    .findAll({
      attributes: ["id", "id_profesor", "nombre"],
      include: [
        {
          as: "profesor",
          model: models.profesor,
          attributes: ["id", "nombre"],
        },
        {
          as: "alumnos",
          model: models.alumno,
          attributes: ["id", "nombre", "id_carrera"],
          through: {
            attributes: ["id_alumno", "id_materia"],
          },
        },
      ],
    })
    .then((materias) => res.send(materias))
    .catch(() => res.sendStatus(500));
};

const crearMateria = (req, res) => {
  let errors = validationResult(req);

  try {
    validationResult(req).throw();
    models.materia
      .create({ nombre: req.body.nombre, id_carrera: req.body.id_carrera })
      .then((materia) => res.status(201).send({ id: materia.id }))
      .catch((error) => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res
            .status(400)
            .send("Bad request: existe otra materia con el mismo nombre");
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
    onNotFound: () => res.status(404).send("Materia no encontrada"),
    onError: () => res.sendStatus(500),
  });
};

const actualizarMateria = (req, res) => {
  let errors = validationResult(req);

  try {
    validationResult(req).throw();

    const onSuccess = (materia) =>
      materia
        .update(
          { nombre: req.body.nombre },
          { fields: ["nombre", "id_carrera"] }
        )
        .then(() => res.sendStatus(200))
        .catch((error) => {
          if (error == "SequelizeUniqueConstraintError: Validation error") {
            res
              .status(400)
              .send("Bad request: existe otra materia con el mismo nombre");
          } else {
            console.log(
              `Error al intentar actualizar la base de datos: ${error}`
            );
            res.sendStatus(500);
          }
        });
    encontrarMateria(req.params.id, {
      onSuccess,
      onNotFound: () => res.status(404).send("Materia no encontrada"),
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

const eliminarMateria = (req, res) => {
  const onSuccess = (materia) =>
    materia
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  encontrarMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.status(404).send("Materia no encontrada"),
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
