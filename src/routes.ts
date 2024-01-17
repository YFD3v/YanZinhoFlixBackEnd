import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";
const router = express.Router();

//É importante que a ordem da rotas dinamicas estejam abaixo das rotas específicas, pois o router testa as rotas em ordem. Caso eu coloque uma não dinamica depois o Router pode confundir como uma dinâmica.

//Passo 15 primeira rota
router.get("/categories", categoriesController.index);
//Passo 17 - obtendo cursos de uma categoria
router.get("/categories/:id", categoriesController.show);

//Passo 19 - obtendo 3 cursos em destaque
router.get("/courses/featured", coursesController.featured);
//Passo 20 - obtendo cursos lançamento
router.get("/courses/newest", coursesController.newest);
//Passo 18 - obtendo informações de um curso
router.get("/courses/:id", coursesController.show);

//Passo a passo para criar essas rotas
//1 - passo criar um controler com os métodos desejados
//2 - Refatorar o código
//3 - criar o router e a rota

export { router };
