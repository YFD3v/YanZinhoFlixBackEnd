// Sétimo passo criação da tabela de episodios

import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

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
//Utilizada para representar os atributos de criação de um episodio, permitindo que algumas propriedades sejam opcionais durante a criação. Por exemplo, pode ser útil ao criar um novo curso sem especificar um ID (que geralmente é gerado automaticamente), a video url ou o secondslong.
export interface EpisodeCreationAttributes
  extends Optional<Episode, "id" | "videoUrl" | "secondsLong"> {}

//Utilizada para representar uma instância específica de um episodio que pode ser manipulada no contexto do modelo de dados definido pela interface Episode e EpisodeCreationAttributes. Incorpora tanto as propriedades do episodio como aquelas definidas para a criação.
//representa um objeto que segue as definições do episodio e seus atributos de criação, permitindo interações e manipulações no contexto do modelo ORM.

export interface EpisodeInstance
  extends Model<Episode, EpisodeCreationAttributes>,
    Episode {}

//Fazendo a mesma coisa que fizemos na migration, porém, no contexto da aplicação
//definindo uma padrão à ser seguido quando se desejar inserir dados na tabela

//Em relação à esse tipo genérico: O primeiro parâmetro EpisodeInstance informa ao Sequelize que as instâncias desse modelo seguirão a estrutura definida por EpisodeInstance.
// O segundo parâmetro Episode é usado para fornecer informações sobre a estrutura da tabela no banco de dados.
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
