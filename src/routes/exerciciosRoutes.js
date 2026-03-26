import { Router } from "express";
import exercicioController from "../controllers/ExercicioController";
import loginRequired from "../middlewares/loginRequired";
const router = new Router();

router.get("/", exercicioController.index);
router.post("/", loginRequired, exercicioController.store);
router.put("/:id", loginRequired, exercicioController.update);
router.get("/:id", loginRequired, exercicioController.show);
router.delete("/:id", loginRequired, exercicioController.delete);

export default router;
