const express = require("express");
const personController = require("../controllers/personController");

const router = express.Router();

router.route("/").get(personController.getAllPersons).post(personController.createPerson);

router.route("/:id").get(personController.getPerson);

router.route("/:idFather/adoptLikeFather/:idChild").patch(personController.adoptLikeFather);

router.route("/:idMother/adoptLikeMother/:idChild").patch(personController.adoptLikeMother);

module.exports = router;
