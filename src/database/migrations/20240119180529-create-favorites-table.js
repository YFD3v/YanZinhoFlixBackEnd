"use strict";
//Passo 27 - Adicionando aos favoritos
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("favorites", {
      //Estamos usando userId e courseId pois a tabela é intermediaria referenciando essa 2 tabelas de user e course
      //Esse primaryKey serve, nesse caso, para fazer uma primaryKey composta:
      /*
        Essa abordagem é utilizada para representar um relacionamento muitos-para-muitos entre usuários e cursos, permitindo que um usuário tenha vários cursos favoritos e que um curso seja favorito para vários usuários. A combinação única de valores nessas colunas garante a unicidade dos registros e a integridade referencial, enquanto as opções onUpdate: "CASCADE" e onDelete: "CASCADE" nas chaves estrangeiras mantêm a consistência dos dados quando há alterações nos registros associados nas tabelas "users" e "courses".

        Permitindo que um userId possa ter varios courseId fazendo par com ele, desde que não repita o mesmo courseId e o mesmo userId
       */
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      course_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "courses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("favorites");
  },
};
