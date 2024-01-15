//Primeiro passo, após instalar dependencias - inicializar o servidor
import express from "express";
import { sequelize } from "./database";
import { adminJs, adminJsRouter } from "./adminjs";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
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
//Apos essas configurações principais existe meio que um modelo a se seguir em relação ao banco de dados:
/*
  1- Crie a migrate do banco de dados com as propriedades que você deseja
  2- Crie o model para ter uma forma de acessa o banco de dados pelo JS
  3- Crie a resource no adminjs com as configuraçções
  4- Opcional, crie uma seeder para popular o banco de dados
*/
