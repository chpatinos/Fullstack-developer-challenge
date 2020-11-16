const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const db = require("../models");
const personModel = db.persons;

exports.getAllPersons = catchAsync(async (req, res, next) => {
  let persons = await personModel.findAll();
  res.status(200).json({
    status: "success",
    results: persons.length,
    data: persons,
  });
});

exports.getPerson = catchAsync(async (req, res, next) => {
  let person = await personModel.findByPk(req.params.id);
  if (!person) return next(new AppError("No person found with id: " + req.params.id, 404));
  res.status(200).json({
    status: "success",
    data: person,
  });
});

exports.createPerson = catchAsync(async (req, res, next) => {
  delete req.body.id;
  delete req.body.createdAt;
  delete req.body.updatedAt;
  let created = await personModel.create(req.body);
  res.status(201).json({
    status: "success",
    created,
  });
});

exports.adoptLikeFather = catchAsync(async (req, res, next) => {
  let child = await personModel.findByPk(req.params.idChild);
  if (!child) return next(new AppError("No person found with id: " + req.params.idChild + " for adopt.", 404));
  if (child.dataValues.father) return next(new AppError("The person with id: " + req.params.idChild + " already has a father.", 404));
  child.father = req.params.idFather;
  await child.save();

  res.status(200).json({
    status: "success",
    father: await personModel.findByPk(req.params.idFather),
    adopted: await personModel.findByPk(req.params.idChild),
  });
});

exports.adoptLikeMother = catchAsync(async (req, res, next) => {
  let child = await personModel.findByPk(req.params.idChild);
  if (!child) return next(new AppError("No person found with id: " + req.params.idChild + " for adopt.", 404));
  if (child.dataValues.mother) return next(new AppError("The person with id: " + req.params.idChild + " already has a mother.", 404));
  child.mother = req.params.idMother;
  await child.save();

  res.status(200).json({
    status: "success",
    mother: await personModel.findByPk(req.params.idMother),
    adopted: await personModel.findByPk(req.params.idChild),
  });
});
