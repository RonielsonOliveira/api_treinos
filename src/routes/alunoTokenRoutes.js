import { Router } from "express";
import AlunoTokenController from "../controllers/AlunoTokenController";

const router = new Router();
router.post("/", AlunoTokenController.store);
export default router;
