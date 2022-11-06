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
    carrera.hasMany(models.materia, {
      as: "materias",
      foreignKey: "id_carrera",
    });
  };

  return carrera;
};
