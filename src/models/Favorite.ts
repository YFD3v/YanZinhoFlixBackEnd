//Passo 27 - Adicionando favoritos
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { CourseInstance } from "./Course";
import { UserInstance } from "./User";

//Define a estrutura de dados que representa o Favorite
export interface Favorite {
  userId: number;
  courseId: number;
}

//Não foi criado o FavoriteCreationAttributes, pois não é necessário já que, não há propriedades opcionais.

//Utilizada para representar uma instância específica de um favorito que pode ser manipulada no contexto do modelo de dados definido pela interface Favorite. Incorpora as propriedades do favorito .
//representa um objeto que segue as definições do favorito permitindo interações e manipulações no contexto do modelo ORM.

export interface FavoriteInstance extends Model<Favorite>, Favorite {
  Course?: CourseInstance;
  User?: UserInstance;
}

//Fazendo a mesma coisa que fizemos na migration, porém, no contexto da aplicação
//definindo uma padrão à ser seguido quando se desejar inserir dados na tabela

//Em relação à esse tipo genérico: O primeiro parâmetro FavoriteInstance informa ao Sequelize que as instâncias desse modelo seguirão a estrutura definida por FavoriteInstance.
// O segundo parâmetro Favorite é usado para fornecer informações sobre a estrutura da tabela no banco de dados.

export const Favorite = sequelize.define<FavoriteInstance, Favorite>(
  "Favorite",
  {
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
  }
);
