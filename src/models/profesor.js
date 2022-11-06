"use strict";
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define(
    "profesor",
    {
      nombre: { type: DataTypes.STRING, unique: true },
      id_materia: DataTypes.INTEGER,
    },
    {}
  );
  profesor.associate = function (models) {
    profesor.hasMany(models.materia, {
      as: "materias",
      foreignKey: "id_carrera",
    });
  };
  return profesor;
};
