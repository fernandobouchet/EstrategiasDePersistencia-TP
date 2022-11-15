require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { protejer } = require("./middleware/autentificacionMiddleware");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/carrera", protejer, require("./routes/carreras"));
app.use("/materia", protejer, require("./routes/materias"));
app.use("/alumno", protejer, require("./routes/alumnos"));
app.use("/profesor", protejer, require("./routes/profesores"));
app.use("/alumno_materia", protejer, require("./routes/alumnos_materias"));
app.use("/usuario", require("./routes/usuarios"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
