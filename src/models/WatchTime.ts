//Passo 34 - Adicionando o progresso de um episódio

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

//Define a estrutura de dados que representa o WatchTime
export interface WatchTimeAttributes {
  seconds: number;
  userId: number;
  episodeId: number;
}

//Não foi criado o WatchTimeCreationAttributes, pois não é necessário já que, não há propriedades opcionais.

//Utilizada para representar uma instância específica de um favorito que pode ser manipulada no contexto do modelo de dados definido pela interface WatchTime. Incorpora as propriedades do favorito .
//representa um objeto que segue as definições do favorito permitindo interações e manipulações no contexto do modelo ORM.

export interface WatchTimeInstance
  extends Model<WatchTimeAttributes>,
    WatchTimeAttributes {}

//Fazendo a mesma coisa que fizemos na migration, porém, no contexto da aplicação
//definindo uma padrão à ser seguido quando se desejar inserir dados na tabela

//Em relação à esse tipo genérico: O primeiro parâmetro WatchTimeInstance informa ao Sequelize que as instâncias desse modelo seguirão a estrutura definida por WatchTimeInstance.
// O segundo parâmetro WatchTime é usado para fornecer informações sobre a estrutura da tabela no banco de dados.

export const WatchTime = sequelize.define<
  WatchTimeInstance,
  WatchTimeAttributes
>("WatchTime", {
  seconds: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  episodeId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: { model: "episodes", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});
