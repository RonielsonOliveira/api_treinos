import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";
import photoController from "../controllers/PhotoExercicioController";
import { uploadImages } from "../config/multerConfig";

const router = new Router();

router.post("/", loginRequired, uploadImages, photoController.store);

export default router;
