//Primeiro passo, após instalar dependencias - inicializar o servidor
import express from "express";
import { sequelize } from "./database";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  //Segundo passo - realizando a authenticação com o banco de dados.
  sequelize.authenticate().then(() => {
    console.log("Sucesso na conexão com o banco de dados");
  });
  console.log("Server iniciado na porta: " + PORT);
});
/*****/
