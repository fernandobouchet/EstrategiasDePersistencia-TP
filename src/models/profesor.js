"use strict";
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define(
    "profesor",
    {
      nombre: { type: DataTypes.STRING, unique: true },
      id_carrera: DataTypes.INTEGER,
    },
    {}
  );
  profesor.associate = function (models) {
    profesor.belongsTo(models.carrera, {
      as: "carrera",
      foreignKey: "id_carrera",
    });
  };
  return profesor;
};
