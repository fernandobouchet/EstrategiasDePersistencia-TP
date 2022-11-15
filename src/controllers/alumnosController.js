const models = require("../models");
const { validationResult } = require("express-validator");
const { obtenerMensajeDeError } = require("../utils/validatorErrorUtils");

const encontrarAlumno = (id, { onSuccess, onNotFound, onError }) => {
  models.alumno
    .findOne({
      attributes: ["id", "nombre", "id_carrera"],
      include: [
        {
          as: "carrera",
          model: models.carrera,
          attributes: ["nombre"],
        },
        {
          as: "materias",
          model: models.materia,
          attributes: ["id", "nombre", "id_profesor"],
          through: {
            attributes: ["id_alumno", "id_materia"],
          },
        },
      ],
      where: { id: id },
    })
    .then((alumno) => (alumno ? onSuccess(alumno) : onNotFound()))
    .catch(() => onError());
};

const obtenerAlumnos = (req, res) => {
  models.alumno
    .findAll({
      attributes: ["id", "id_carrera", "nombre"],
      include: [
        {
          as: "carrera",
          model: models.carrera,
          attributes: ["id", "nombre"],
        },
        {
          as: "materias",
          model: models.materia,
          attributes: ["id", "nombre", "id_profesor"],
          through: {
            attributes: ["id_alumno", "id_materia"],
          },
        },
      ],
    })
    .then((alumnos) => res.send(alumnos))
    .catch(() => res.sendStatus(500));
};

const crearAlumno = (req, res) => {
  let errors = validationResult(req);
  try {
    validationResult(req).throw();
    models.alumno
      .create({
        nombre: req.body.nombre,
        id_carrera: req.body.id_carrera,
      })
      .then((alumno) => res.status(201).send({ id: alumno.id }))
      .catch((error) => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res
            .status(400)
            .send("Bad request: existe otro alumno con el mismo nombre");
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

const obtenerYFiltrarAlumnos = (req, res) => {
  let offset = parseInt(req.query.pagActual) || 0;
  let limit = parseInt(req.query.cantAVer) || 10;

  models.alumno
    .findAll({
      offset: offset * limit,
      limit: limit,
      attributes: ["id", "id_carrera", "nombre"],
      include: [
        {
          as: "carrera",
          model: models.carrera,
          attributes: ["nombre"],
        },
        {
          as: "materias",
          model: models.materia,
          attributes: ["id", "nombre", "id_profesor"],
          through: {
            attributes: ["id_alumno", "id_materia"],
          },
        },
      ],
    })
    .then((alumnos) => res.send(alumnos))
    .catch(() => res.sendStatus(500));
};

const obtenerUnAlumno = (req, res) => {
  encontrarAlumno(req.params.id, {
    onSuccess: (alumno) => res.send(alumno),
    onNotFound: () => res.status(404).send("Alumno no encontrado"),
    onError: () => res.sendStatus(500),
  });
};

const actualizarAlumno = (req, res) => {
  let errors = validationResult(req);
  try {
    validationResult(req).throw();
    const onSuccess = (alumno) =>
      alumno
        .update(
          { nombre: req.body.nombre, id_carrera: req.body.id_carrera },
          { fields: ["nombre", "id_carrera"] }
        )
        .then(() => res.sendStatus(200))
        .catch((error) => {
          if (error == "SequelizeUniqueConstraintError: Validation error") {
            res
              .status(400)
              .send("Bad request: existe otro alumno con el mismo nombre");
          } else {
            console.log(
              `Error al intentar actualizar la base de datos: ${error}`
            );
            res.sendStatus(500);
          }
        });
    encontrarAlumno(req.params.id, {
      onSuccess,
      onNotFound: () => res.status(404).send("Alumno no encontrado"),
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

const eliminarAlumno = (req, res) => {
  const onSuccess = (alumno) =>
    alumno
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  encontrarAlumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.status(404).send("Alumno no encontrado"),
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
