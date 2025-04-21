const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware");

//importação controller
const alunoController = require("../controllers/aluno.controller");

//rotas (endpoints) da entidade 'aluno'
router.post("/student", middleware.checkToken, alunoController.createStudent);
router.get("/students", middleware.checkToken, alunoController.getAllStudents);
router.put("/student/:id", middleware.checkToken, alunoController.updateStudent);
router.delete("/student/:id", middleware.checkToken, alunoController.deleteStudent);
router.get("/student/:id", middleware.checkToken, alunoController.getStudentById);
router.get("/student/:name", middleware.checkToken, alunoController.getStudentByName);

router.post("/student/:id/addsubject", alunoController.addSubjectToStudent);

router.get(
  "/student/:id/subjects",
  middleware.checkToken,
  alunoController.getSubjectsEnrolledByStudent
);

module.exports = router;