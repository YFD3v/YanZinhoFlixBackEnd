"use strict";

//Sexto passo - criaçaõ do seeder
//npx sequelize-cli seed:generate --name "Nome do seeder" -gerar um seed
//npx sequelize-cli db:seed:all, :all serve para executar todos os seeders
//Para executar o down - npx sequelize-cli db:seed:undo:all
//Os seeders servem para popular umbanco de dados com dados iniciais ou de exemplo.

module.exports = {
  async up(queryInterface, Sequelize) {
    //Tabela, array de registros
    //Pelo fato de não utilizarmos o model do sequelize, tem que crair manualmente as propriedades em snake_case e criar as timestamps .
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Tecnologias Back-end",
          position: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Tecnologias Front-end",
          position: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Ferramentas de Desenvolvimento",
          position: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Soft-skills",
          position: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Carreira",
          position: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    //Tabela,filtro, opções
    await queryInterface.bulkDelete("categories", null, {});
  },
};
