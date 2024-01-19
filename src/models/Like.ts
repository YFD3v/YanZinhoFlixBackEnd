//Passo 30 - Criando o gostei
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

//Define a estrutura de dados que representa o Like
export interface Like {
  userId: number;
  courseId: number;
}

//Não foi criado o LikeCreationAttributes, pois não é necessário já que, não há propriedades opcionais.

//Utilizada para representar uma instância específica de um favorito que pode ser manipulada no contexto do modelo de dados definido pela interface Like. Incorpora as propriedades do favorito .
//representa um objeto que segue as definições do favorito permitindo interações e manipulações no contexto do modelo ORM.

export interface LikeInstance extends Model<Like>, Like {}

//Fazendo a mesma coisa que fizemos na migration, porém, no contexto da aplicação
//definindo uma padrão à ser seguido quando se desejar inserir dados na tabela

//Em relação à esse tipo genérico: O primeiro parâmetro LikeInstance informa ao Sequelize que as instâncias desse modelo seguirão a estrutura definida por LikeInstance.
// O segundo parâmetro Like é usado para fornecer informações sobre a estrutura da tabela no banco de dados.

export const Like = sequelize.define<LikeInstance, Like>("Like", {
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  courseId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: "courses",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});
