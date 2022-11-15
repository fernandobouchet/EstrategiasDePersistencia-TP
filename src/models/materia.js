"use strict";
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define(
    "materia",
    {
      nombre: { type: DataTypes.STRING, unique: true },
      id_profesor: DataTypes.INTEGER,
    },
    {}
  );
  materia.associate = function (models) {
    materia.belongsTo(models.profesor, {
      as: "profesor",
      foreignKey: "id_profesor",
    });
    materia.belongsToMany(models.alumno, {
      through: "alumno_materia",
      as: "alumnos",
      foreignKey: "id_materia",
    });
  };
  return materia;
};
