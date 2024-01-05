import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5433,
  database: "yanzinhoflix_development",
  username: "yanzinhoflix",
  password: "yanzinhoflix",
  define: {
    underscored: true,
  },
});
