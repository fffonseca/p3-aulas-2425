const express = require('express');
const router = express.Router();

//importação do controller e da middleware
const middleware = require("../middleware");
const professorController = require("../controllers/professor.controller");

// Rota para obter todas as disciplinas
router.get("/teachers", professorController.getAllTeachers);
router.post(
  "/teacher",
  middleware.checkToken,
  professorController.createTeacher
);
router.put(
  "/teacher/:id",
  middleware.checkToken,
  professorController.updateTeacher
);
router.delete(
  "/teacher/:id",
  middleware.checkToken,
  professorController.deleteTeacher
);

module.exports = router;