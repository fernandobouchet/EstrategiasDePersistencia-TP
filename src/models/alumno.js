"use strict";
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define(
    "alumno",
    {
      nombre: { type: DataTypes.STRING, unique: true },
      id_carrera: DataTypes.INTEGER,
    },
    {}
  );
  alumno.associate = function (models) {
    alumno.belongsTo(models.carrera, {
      as: "carrera",
      foreignKey: "id_carrera",
    });
  };
  return alumno;
};
