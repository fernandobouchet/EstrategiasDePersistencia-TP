const jwt = require('jsonwebtoken');
const models = require('../models');

const protejer = async (req, res, next) => {
  let token;

  if (req.headers.token) {
    try {
      token = req.headers.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      models.usuario.findOne({
        attributes: ['id'],
        where: { id: decoded.id },
      });
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('No token');
  }
};

module.exports = { protejer };
