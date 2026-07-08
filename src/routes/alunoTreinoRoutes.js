import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";
import AlunoTreinoController from "../controllers/AlunoTreinoController";

const router = new Router();

router.get("/me/treinos", loginRequired, AlunoTreinoController.index);
router.get(
  "/alunos/:alunoId/treinos",
  loginRequired,
  AlunoTreinoController.show,
);

export default router;
