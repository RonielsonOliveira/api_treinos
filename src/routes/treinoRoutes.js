import { Router } from "express";
import treinoController from "../controllers/TreinoController";
import loginRequired from "../middlewares/loginRequired";
const router = new Router();

router.get("/", loginRequired, treinoController.index);
router.post("/", loginRequired, treinoController.store);
router.put("/:id", loginRequired, treinoController.update);
router.get("/:id", loginRequired, treinoController.show);
router.delete("/:id", loginRequired, treinoController.delete);

export default router;
