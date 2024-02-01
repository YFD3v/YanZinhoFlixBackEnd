import { Sequelize } from "sequelize";
import { DATABASE_URL } from "../config/enviroment";
//Passo 2 - configurando o sequelize

//Aqui estamos definindo como será a conexão
//Qual o usuário e banco de dados que sera usado
export const sequelize = new Sequelize(DATABASE_URL, {
  ////Passo 40 - Depploy aula 2 - fazendo as correções do npm e do adminjs e algumas correções de variaveis de ambiente. Foi instalado o dotenv e env-var e criado o arquivo .env. TRÁS SEGURANÇA
  //Fazendo o uso da variavel DATABSE_URl
  // dialect: "postgres",
  // host: "localhost",
  // port: 5433,
  // database: "yanzinhoflix_development",
  // username: "yanzinhoflix",
  // password: "yanzinhoflix",
  define: {
    underscored: true,
  },
});
