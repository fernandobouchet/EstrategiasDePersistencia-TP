const obtenerMensajeDeError = (error) => {
  return `Error: ${error.errors[0].msg}`;
};

module.exports = { obtenerMensajeDeError };
