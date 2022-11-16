const Sequelize = require("sequelize");
const models = require("./models");

const sequelize = new Sequelize("api_v1", "admin", "password", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("La conexión se ha establecido exitosamente");
  })
  .catch((error) => {
    console.error(
      `No fue posible conectarse a la base de datos: ${sequelize.config.database}`,
      error
    );
  });

//Se eliminan los registros de las tablas

models.alumno.destroy({
  where: {},
  truncate: true,
});
models.profesor.destroy({
  where: {},
  truncate: true,
});
models.carrera.destroy({
  where: {},
  truncate: true,
});
models.materia.destroy({
  where: {},
  truncate: true,
});
models.alumno_materia.destroy({
  where: {},
  truncate: true,
});

// Se insertan los registros
sequelize.sync().then(() =>
  models.alumno
    .bulkCreate([
      {
        nombre: "Fernando Bouchet",
        id_carrera: 1,
      },
      {
        nombre: "Ramiro Gomez",
        id_carrera: 1,
      },
      {
        nombre: "Luciana Ramirez",
        id_carrera: 1,
      },
      {
        nombre: "Andrea Plop",
        id_carrera: 1,
      },
      {
        nombre: "Julian Rever",
        id_carrera: 2,
      },
      {
        nombre: "Daiana Spatallo",
        id_carrera: 2,
      },
      {
        nombre: "Juan Lopez",
        id_carrera: 3,
      },
      {
        nombre: "Sofia Gutierrez",
        id_carrera: 3,
      },
      {
        nombre: "Carlos Garro",
        id_carrera: 4,
      },
      {
        nombre: "Guillermo Frey",
        id_carrera: 4,
      },
      {
        nombre: "Juliana Arter",
        id_carrera: 4,
      },
    ])
    .then(() => {
      console.log("Registros insertados");
    })
    .catch((error) => {
      console.log(error);
    })
);

sequelize.sync().then(() =>
  models.profesor
    .bulkCreate([
      {
        nombre: "Carlos Rodriguez",
        id_carrera: 1,
      },
      {
        nombre: "Pedro Gonzalez",
        id_carrera: 1,
      },
      {
        nombre: "Marisa Sanchez",
        id_carrera: 2,
      },
      {
        nombre: "Guillermina Catrek",
        id_carrera: 2,
      },
      {
        nombre: "Marcelo Perez",
        id_carrera: 3,
      },
      {
        nombre: "Lorena Eschen",
        id_carrera: 4,
      },
      {
        nombre: "Mario Irusti",
        id_carrera: 5,
      },
      {
        nombre: "Claudia Salamanca",
        id_carrera: 5,
      },
      {
        nombre: "Jose Molina",
        id_carrera: 1,
      },
      {
        nombre: "Lucas Sardelli",
        id_carrera: 2,
      },
    ])
    .then(() => {
      console.log("Registros insertados");
    })
    .catch((error) => {
      console.log(error);
    })
);

sequelize.sync().then(() =>
  models.carrera
    .bulkCreate([
      {
        nombre: "Licenciatura en Informática",
      },
      {
        nombre: "Licenciatura en Educación",
      },
      {
        nombre: "Profesorado universitario de Inglés",
      },
      {
        nombre: "Tecnicatura en Laboratorio",
      },
      {
        nombre: "Ingenieria Electrica",
      },
    ])
    .then(() => {
      console.log("Registros insertados");
    })
    .catch((error) => {
      console.log(error);
    })
);

sequelize.sync().then(() =>
  models.materia
    .bulkCreate([
      {
        nombre: "Matemáticas",
        id_profesor: 1,
      },
      {
        nombre: "Inglés",
        id_profesor: 2,
      },
      {
        nombre: "Estrategias de persistencia",
        id_profesor: 3,
      },
      {
        nombre: "Programación funcional",
        id_profesor: 4,
      },
      {
        nombre: "Laboratorio I",
        id_profesor: 5,
      },
      {
        nombre: "Electricidad I",
        id_profesor: 6,
      },
      {
        nombre: "Lengua y literatura",
        id_profesor: 7,
      },
      {
        nombre: "Sociedad I",
        id_profesor: 8,
      },
      {
        nombre: "Practica profesional industrial",
        id_profesor: 9,
      },
      {
        nombre: "Quimica II",
        id_profesor: 10,
      },
      {
        nombre: "Educación inicial I",
        id_profesor: 2,
      },
    ])
    .then(() => {
      console.log("Registros insertados");
    })
    .catch((error) => {
      console.log(error);
    })
);

sequelize.sync().then(() =>
  models.alumno_materia
    .bulkCreate([
      {
        id_materia: 2,
        id_alumno: 1,
      },
      {
        id_materia: 4,
        id_alumno: 2,
      },
      {
        id_materia: 3,
        id_alumno: 3,
      },
      {
        id_materia: 4,
        id_alumno: 4,
      },
      {
        id_materia: 7,
        id_alumno: 5,
      },
      {
        id_materia: 11,
        id_alumno: 6,
      },
      {
        id_materia: 1,
        id_alumno: 7,
      },
      {
        id_materia: 10,
        id_alumno: 9,
      },
      {
        id_materia: 2,
        id_alumno: 8,
      },
      {
        id_materia: 5,
        id_alumno: 10,
      },
      {
        id_materia: 10,
        id_alumno: 11,
      },
    ])
    .then(() => {
      console.log("Registros insertados");
    })
    .catch((error) => {
      console.log(error);
    })
);
