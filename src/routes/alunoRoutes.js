import { Router } from "express";
import AlunoController from "../controllers/AlunoController";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

// LISTAR ALUNOS
router.get("/", loginRequired, AlunoController.index);

// CRIAR ALUNO
router.post("/", loginRequired, AlunoController.store);

// MOSTRAR UM ALUNO
router.get("/:id", loginRequired, AlunoController.show);

// ATUALIZAR
router.put("/:id", loginRequired, AlunoController.update);

// DELETAR
router.delete("/:id", loginRequired, AlunoController.delete);

export default router;
