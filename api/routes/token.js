const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

router.get('/', (req, res) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send('Verificacion exitosa!');
    } else {
      return res.status(401).send(error);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
});

router.post('/', (req, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: 12,
  };
  const token = jwt.sign(data, jwtSecretKey);

  res.send(token);
});

module.exports = router;
