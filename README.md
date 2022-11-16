# EstrategiasDePersistencia-TP

Trabajo práctico de la materia 'Estrategias de persistencia', a cargo del profesor Pablo Marcelli, de la carrera universitaria en informática de la [UNAHUR](https://unahur.edu.ar/).

El proyecto consiste en una API rest, utilizando 'sequelize' como ORM para comunicarse con la base de datos (SQL).

Se crearon los modelos de las entidades,las rutas, los controladores y validaciones.

Para poder interactuar con estas rutas es necesario la creación ('POST') de un usuario con contraseña y posteriormente la solicitud ('GET') de un 'token' asociado a ese usuario a la ruta '/usuario'.

Se pueden obtener ('GET') por cada entidad: todos los registros, un registro con un 'id' específico y todos los registros con paginación,se puede eliminar ('DELETE') un registro,
se puede modificar ('PUT') un registro y se puede crear ('POST') un registro.

Se adjunta el diagrama realizado:
## Diagrama entidad relación - DER

![App Screenshot](https://github.com/fernandobouchet/EstrategiasDePersistencia-TP/blob/main/DER-2.png?raw=true)

## Paquetes utilizados

- [express](http://expressjs.com/)
- [express-validator](https://express-validator.github.io/)
- [sequelize](https://sequelize.org/)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [nodemon](https://www.npmjs.com/package/nodemon)

## Instalación

```
git clone https://github.com/EstrategiasDePersistencia-TP
cd EstrategiasDePersistencia-api
npm install
npm run server
```
