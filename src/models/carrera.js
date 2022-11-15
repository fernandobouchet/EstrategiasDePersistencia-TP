"use strict";
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define(
    "carrera",
    {
      nombre: { type: DataTypes.STRING, unique: true },
    },
    {}
  );
  carrera.associate = function (models) {
    carrera.hasMany(models.profesor, {
      as: "profesor",
      foreignKey: "id_carrera",
    });
    carrera.hasMany(models.alumno, {
      as: "alumnos",
      foreignKey: "id_carrera",
    });
  };

  return carrera;
};
