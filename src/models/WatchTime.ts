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

//Esta interface representa uma instância específica do modelo de watchTime que pode ser manipulada no contexto do modelo de dados definido por WatchTime e WatchTimeCreationAttributes. Ela estende tanto a interface Model quanto a WatchTime, incorporando as propriedades e métodos associados ao modelo Sequelize. Isso inclui métodos como create, update, entre outros.

export interface WatchTimeInstance
  extends Model<WatchTimeAttributes>,
    WatchTimeAttributes {}

//Fazendo a mesma coisa que fizemos na migration, porém, no contexto da aplicação
//definindo uma padrão à ser seguido quando se desejar inserir dados na tabela

/*
Em relação ao tipo genérico:
  A utilização de tipos genéricos na função sequelize.define tem a finalidade de fornecer informações adicionais ao Sequelize sobre a estrutura do modelo. Vamos analisar a assinatura da função sequelize.define e a explicação dos tipos genéricos no seu exemplo:

  sequelize.define<InstanceType, ModelAttributes>("modelName", attributes)

  InstanceType (EpisodeInstance): Este é o tipo que representa a instância específica do modelo. Ou seja, quando você cria uma instância de "Episode" usando este modelo, ela terá o tipo EpisodeInstance. Isso é útil para ter autocompletar e garantir tipos seguros ao trabalhar com instâncias específicas do modelo.

  ModelAttributes (Episode): Este é o tipo que representa os atributos do modelo. Ele define a estrutura dos dados que serão armazenados no banco de dados. Quando você consulta ou cria um novo registro no banco de dados usando este modelo, os atributos são validados e mapeados de acordo com este tipo.

*/

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
