//Primeiro passo, após instalar dependencias - inicializar o servidor
import express from "express";
import { sequelize } from "./database";
import { adminJs, adminJsRouter } from "./adminjs";

const app = express();
app.use(express.static("public"));
app.use(adminJs.options.rootPath, adminJsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  //Segundo passo - realizando a authenticação com o banco de dados.
  sequelize.authenticate().then(() => {
    console.log("Sucesso na conexão com o banco de dados");
  });
  console.log("Server iniciado na porta: " + PORT);
});

/*****/
