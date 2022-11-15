'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno_materia = sequelize.define('alumno_materia', {
    id_alumno: DataTypes.INTEGER,
    id_materia: DataTypes.INTEGER
  }, {});
  alumno_materia.associate = function(models) {
    // associations can be defined here
  };
  return alumno_materia;
};