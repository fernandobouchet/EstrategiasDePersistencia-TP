"use strict";
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define(
    "usuario",
    {
      nombre: { type: DataTypes.STRING, unique: true },
      clave: DataTypes.STRING,
    },
    {}
  );
  usuario.associate = function (models) {
    // associations can be defined here
  };
  return usuario;
};
