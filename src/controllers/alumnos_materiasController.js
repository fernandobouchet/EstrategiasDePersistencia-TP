const models = require("../models");
const { validationResult } = require("express-validator");
const { obtenerMensajeDeError } = require("../utils/validatorErrorUtils");

const encontarAlumnoMateria = (id, { onSuccess, onNotFound, onError }) => {
  models.alumno_materia
    .findOne({
      attributes: ["id", "id_alumno", "id_materia"],
      include: [
        {
          as: "alumno",
          model: models.alumno,
          attributes: ["id", "nombre"],
        },
        {
          as: "materia",
          model: models.materia,
          attributes: ["id", "nombre"],
        },
      ],
      where: { id: id },
    })
    .then((alumno_materia) =>
      alumno_materia ? onSuccess(alumno_materia) : onNotFound()
    )
    .catch(() => onError());
};

const obtenerAlumnosMaterias = (req, res) => {
  models.alumno_materia
    .findAll({
      attributes: ["id", "id_alumno", "id_materia"],
      include: [
        {
          as: "alumno",
          model: models.alumno,
          attributes: ["id", "nombre"],
        },
        {
          as: "materia",
          model: models.materia,
          attributes: ["id", "nombre"],
        },
      ],
    })
    .then((alumno_materia) => res.send(alumno_materia))
    .catch(() => res.sendStatus(500));
};

const crearAlumnosMaterias = (req, res) => {
  let errors = validationResult(req);
  try {
    validationResult(req).throw();
    models.alumno_materia
      .create({
        id_alumno: req.body.id_alumno,
        id_materia: req.body.id_materia,
      })
      .then((alumno_materia) => res.status(201).send({ id: alumno_materia.id }))
      .catch((error) => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res
            .status(400)
            .send(
              "Bad request: existe otro alumno_materia con el mismo nombre"
            );
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

const obtenerYFiltrarAlumnosMaterias = (req, res) => {
  let offset = parseInt(req.query.pagActual) || 0;
  let limit = parseInt(req.query.cantAVer) || 10;

  models.alumno_materia
    .findAll({
      offset: offset * limit,
      limit: limit,
      attributes: ["id", "id_alumno", "id_materia"],
      include: [
        {
          as: "alumno",
          model: models.alumno,
          attributes: ["id", "nombre"],
        },
        {
          as: "materia",
          model: models.materia,
          attributes: ["id", "nombre"],
        },
      ],
    })
    .then((alumno_materia) => res.send(alumno_materia))
    .catch(() => res.sendStatus(500));
};

const obtenerUnAlumnoMateria = (req, res) => {
  encontarAlumnoMateria(req.params.id, {
    onSuccess: (alumno_materia) => res.send(alumno_materia),
    onNotFound: () => res.status(404).send("AlumnoMateria no encontrado"),
    onError: () => res.sendStatus(500),
  });
};

const actualizarAlumnoMateria = (req, res) => {
  let errors = validationResult(req);
  try {
    validationResult(req).throw();
    const onSuccess = (alumno_materia) =>
      alumno_materia
        .update(
          { id_alumno: req.body.id_alumno, id_materia: req.body.id_materia },
          { fields: ["id_alumno", "id_materia"] }
        )
        .then(() => res.sendStatus(200))
        .catch((error) => {
          if (error == "SequelizeUniqueConstraintError: Validation error") {
            res
              .status(400)
              .send(
                "Bad request: existe otro AlumnoMateria con los mismos datos"
              );
          } else {
            console.log(
              `Error al intentar actualizar la base de datos: ${error}`
            );
            res.sendStatus(500);
          }
        });
    encontarAlumnoMateria(req.params.id, {
      onSuccess,
      onNotFound: () => res.status(404).send("AlumnoMateria no encontrado"),
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

const eliminaAlumnoMateria = (req, res) => {
  const onSuccess = (alumno_materia) =>
    alumno_materia
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  encontarAlumnoMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.status(404).send("AlumnoMateria no encontrado"),
    onError: () => res.sendStatus(500),
  });
};

module.exports = {
  obtenerAlumnosMaterias,
  crearAlumnosMaterias,
  obtenerYFiltrarAlumnosMaterias,
  obtenerUnAlumnoMateria,
  actualizarAlumnoMateria,
  eliminaAlumnoMateria,
};
