"use strict";
//Passo 34 - Adicionando o progresso de um episódio
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //Estamos usando userId e episodeId pois a tabela é intermediaria referenciando essa 2 tabelas
    //Esse primaryKey serve, nesse caso, para fazer uma primaryKey composta.
    /*
    OBS: O PRIMARY KEY ESTA NA MODEL ESQUECI DE COLOCAR NA MIGRATION
        Permitindo que um userId possa ter varios episodeId fazendo par com ele, desde que não repita o mesmo courseId e o mesmo userId
        MANY-TO-MANY
       */
    await queryInterface.createTable("watch_times", {
      seconds: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      episode_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "episodes", key: "id" },
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
    await queryInterface.dropTable("watch_times");
  },
};
