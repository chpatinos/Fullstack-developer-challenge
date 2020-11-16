const globalErrorHandler = require("./controllers/errorController");
const personRouter = require("./routes/personRouter");
const AppError = require("./utils/appError");
const express = require("express");
const app = express();

//MIDDLEWARE
app.use(express.json());

//ROUTES
app.use("/api/v1/persons", personRouter);

//RUN
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
