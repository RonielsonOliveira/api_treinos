import app from "./app";
import dotenv from "dotenv";

// carregar variáveis do .env
dotenv.config({ path: "/home/vboxuser/api/uploads/.env" });

// inicia o servidor
app.start();
