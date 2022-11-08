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
        id_materia: 1,
      },
      {
        nombre: "Pedro Gonzalez",
        id_materia: 1,
      },
      {
        nombre: "Marisa Sanchez",
        id_materia: 2,
      },
      {
        nombre: "Guillermina Catrek",
        id_materia: 2,
      },
      {
        nombre: "Marcelo Perez",
        id_materia: 3,
      },
      {
        nombre: "Lorena Eschen",
        id_materia: 4,
      },
      {
        nombre: "Mario Irusti",
        id_materia: 5,
      },
      {
        nombre: "Claudia Salamanca",
        id_materia: 6,
      },
      {
        nombre: "Jose Molina",
        id_materia: 7,
      },
      {
        nombre: "Lucas Sardelli",
        id_materia: 8,
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
        id_carrera: 1,
      },
      {
        nombre: "Inglés",
        id_carrera: 1,
      },
      {
        nombre: "Estrategias de persistencia",
        id_carrera: 1,
      },
      {
        nombre: "Programación funcional",
        id_carrera: 1,
      },
      {
        nombre: "Laboratorio I",
        id_carrera: 4,
      },
      {
        nombre: "Electricidad I",
        id_carrera: 5,
      },
      {
        nombre: "Lengua y literatura",
        id_carrera: 3,
      },
      {
        nombre: "Sociedad I",
        id_carrera: 3,
      },
      {
        nombre: "Practica profesional industrial",
        id_carrera: 5,
      },
      {
        nombre: "Quimica II",
        id_carrera: 4,
      },
      {
        nombre: "Educación inicial I",
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
