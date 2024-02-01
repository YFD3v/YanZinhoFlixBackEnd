////Passo 40 - Depploy aula 2 - fazendo as correções do npm e do adminjs e algumas correções de variaveis de ambiente. Foi instalado o dotenv e env-var e criado o arquivo .env. TRÁS SEGURANÇA
require("dotenv").config();

//Segundo passo - realizando a conexão do sequelize
//Após isso foi criado o banco de dados através do sequelize-cli db:create
module.exports = {
  development: {
    // dialect: "postgres",
    // host: "localhost",
    // port: 5433,
    // database: "yanzinhoflix_development",
    // username: "yanzinhoflix",
    // password: "yanzinhoflix",
    url: process.env.DATABASE_URL,
  },
  production: {
    url: process.env.DATABASE_URL,
  },
};
