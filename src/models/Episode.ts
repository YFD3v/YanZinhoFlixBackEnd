// Sétimo passo criação da tabela de episodios

import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";
import { WatchTimeInstance } from "./WatchTime";

//Define a estrutura de dados que representa o episodio
export interface Episode {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl: string;
  secondsLong: number;
  courseId: number;
}
//Utilizada para representar os atributos de criação de um episodio, permitindo que algumas propriedades sejam opcionais durante a criação. Por exemplo, pode ser útil ao criar um novo episódio sem especificar um ID (que geralmente é gerado automaticamente), a video url ou o secondslong.
export interface EpisodeCreationAttributes
  extends Optional<Episode, "id" | "videoUrl" | "secondsLong"> {}

//Esta interface representa uma instância específica do modelo de episódio que pode ser manipulada no contexto do modelo de dados definido por Episode e EpisodeCreationAttributes. Ela estende tanto a interface Model quanto a Episode, incorporando as propriedades e métodos associados ao modelo Sequelize. Isso inclui métodos como create, update, entre outros.

export interface EpisodeInstance
  extends Model<Episode, EpisodeCreationAttributes>,
    Episode {
  //Passo 35 - Obtendo a lista de continuar assintindo
  watchTime?: WatchTimeInstance;
}

//Fazendo a mesma coisa que fizemos na migration, porém, no contexto da aplicação
//definindo uma padrão à ser seguido quando se desejar inserir dados na tabela
/*
Em relação ao tipo genérico:
  A utilização de tipos genéricos na função sequelize.define tem a finalidade de fornecer informações adicionais ao Sequelize sobre a estrutura do modelo. Vamos analisar a assinatura da função sequelize.define e a explicação dos tipos genéricos no seu exemplo:

  sequelize.define<InstanceType, ModelAttributes>("modelName", attributes)

  InstanceType (EpisodeInstance): Este é o tipo que representa a instância específica do modelo. Ou seja, quando você cria uma instância de "Episode" usando este modelo, ela terá o tipo EpisodeInstance. Isso é útil para ter autocompletar e garantir tipos seguros ao trabalhar com instâncias específicas do modelo.

  ModelAttributes (Episode): Este é o tipo que representa os atributos do modelo. Ele define a estrutura dos dados que serão armazenados no banco de dados. Quando você consulta ou cria um novo registro no banco de dados usando este modelo, os atributos são validados e mapeados de acordo com este tipo.

*/
export const Episode = sequelize.define<EpisodeInstance, Episode>("Episode", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  synopsis: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  order: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  videoUrl: {
    type: DataTypes.STRING,
  },
  secondsLong: {
    type: DataTypes.INTEGER,
  },
  courseId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "courses", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
});
