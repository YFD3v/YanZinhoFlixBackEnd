//Primeiro passo, após instalar dependencias - inicializar o servidor
//Passo 40 - Depploy aula 2 - fazendo as correções do npm e do adminjs e algumas correções de variaveis de ambiente. Foi instalado o dotenv e env-var e criado o arquivo .env. TRÁS SEGURANÇA
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { sequelize } from "./database";
import { adminJs, adminJsRouter } from "./adminjs";
import path from "path";
import { router } from "./routes";

const app = express();

//Passo 39 - Ultimo passo : Adicionando o cors
//Foi instaldo o cors e -D @types/cors
/*
O que é o CORS?
  Recurso do navegador que bloqueia requisições de origens diferentes por segurança
  No nosso caso, back-end e front-end estarão hospedados separadamente, em origens diferentes
  Origem = domínio onde cada parte será hospedada
  Por padrão, navegador bloqueia requisições do front-end para o back-end
  Queremos impedir esse bloqueio

  Quando o front-end e o back-end de uma aplicação estão em origens diferentes, você precisa lidar com as políticas de mesma origem do navegador, e é aí que o CORS entra em cena.

  Se o front-end (o código do cliente executado no navegador) está hospedado em um domínio diferente do back-end (o código do servidor que fornece a API ou os recursos), os navegadores aplicam a política de mesma origem, bloqueando solicitações HTTP entre essas origens.
  qui está uma explicação simplificada de como funciona:

  Solicitação do Front-End: O front-end faz uma solicitação HTTP para o back-end a partir de um domínio diferente.

  Middleware CORS: O middleware CORS no back-end analisa a solicitação e adiciona os cabeçalhos CORS apropriados à resposta.

  Cabeçalhos CORS na Resposta: Os cabeçalhos CORS, como "Access-Control-Allow-Origin", são enviados de volta ao navegador junto com a resposta do back-end.

  Navegador: O navegador verifica os cabeçalhos CORS na resposta e permite ou bloqueia a solicitação do front-end com base nessas informações.

  Ao permitir explicitamente as origens desejadas, você evita os bloqueios padrão do navegador e permite que o front-end acesse recursos no back-end de forma segura, seguindo as regras do CORS. Isso é especialmente importante em arquiteturas de aplicativos onde o front-end e o back-end estão hospedados em servidores separados ou em domínios diferentes.

*/
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(adminJs.options.rootPath, adminJsRouter);
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  //Segundo passo - realizando a authenticação com o banco de dados.
  sequelize.authenticate().then(() => {
    console.log("Sucesso na conexão com o banco de dados");
  });
  console.log("Server iniciado na porta: " + PORT);
});

/*****/
