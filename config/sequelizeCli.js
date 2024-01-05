//Segundo passo - realizando a conexão do sequelize
//Após isso foi criado o banco de dados através do sequelize-cli db:create
module.exports = {
  development: {
    dialect: "postgres",
    host: "localhost",
    port: 5433,
    database: "yanzinhoflix_development",
    username: "yanzinhoflix",
    password: "yanzinhoflix",
  },
};
