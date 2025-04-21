const express = require('express');
const router = express.Router();

//importação do controller e da middleware
const middleware = require("../middleware");
const disciplinaController = require("../controllers/disciplina.controller");

// Rota para obter todas as disciplinas
router.get("/subjects", disciplinaController.getAllSubjects);
router.post(
  "/subject",
  middleware.checkToken,
  disciplinaController.createSubject
);
router.put(
  "/subject/:id",
  middleware.checkToken,
  disciplinaController.updateSubject
);
router.delete(
  "/subject/:id",
  middleware.checkToken,
  disciplinaController.deleteSubject
);

module.exports = router;