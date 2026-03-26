import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";
import AlunoTreinoController from "../controllers/AlunoTreinoController";

const router = new Router();

router.get("/me/treinos", loginRequired, AlunoTreinoController.index);

export default router;
