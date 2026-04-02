import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "exercicios",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export const uploadImages = multer({ storage }).array("fotos");
