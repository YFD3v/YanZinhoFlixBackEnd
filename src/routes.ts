import express from "express";
import { categoriesController } from "./controllers/categoriesController";
const router = express.Router();

//Passo 15 primeira rota
router.get("/categories", categoriesController.index);
//Passo 17 - obtendo cursos de uma categoria
router.get("/categories/:id", categoriesController.show);

export { router };
