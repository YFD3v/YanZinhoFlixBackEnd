//Quarto passo - foi criada a migration da tabela category, e agora estamos fazendo a forma de nos conectarmos com ela

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

//Define a estrutura de dados que representa a categoria
export interface Category {
  id: number;
  name: string;
  position: number;
}

//Estamos dizendo que na criação de uma categoria o campo id é opcional pois é o banco de dados que vai realizar a criação id, mas na interface estamos colocando o id pq é o padrão de todas as propriedades que cada categoria vai ter.
export interface CategoryCreationAttributes extends Optional<Category, "id"> {}

//Esta interface representa uma instância específica do modelo de categoria que pode ser manipulada no contexto do modelo de dados definido por Category e CategoryCreationAttributes. Ela estende tanto a interface Model quanto a Category, incorporando as propriedades e métodos associados ao modelo Sequelize. Isso inclui métodos como create, update, entre outros.
export interface CategoryInstance
  extends Model<Category, CategoryCreationAttributes>,
    Category {}

//Fazendo a mesma coisa que fizemos na migration, porém, no contexto da aplicação
//definindo uma padrão à ser seguido quando se desejar inserir dados na tabela

//Em relação à esse tipo genérico:
/*
  A utilização de tipos genéricos na função sequelize.define tem a finalidade de fornecer informações adicionais ao Sequelize sobre a estrutura do modelo. Vamos analisar a assinatura da função sequelize.define e a explicação dos tipos genéricos no seu exemplo:

  sequelize.define<InstanceType, ModelAttributes>("modelName", attributes)

  InstanceType (EpisodeInstance): Este é o tipo que representa a instância específica do modelo. Ou seja, quando você cria uma instância de "Episode" usando este modelo, ela terá o tipo EpisodeInstance. Isso é útil para ter autocompletar e garantir tipos seguros ao trabalhar com instâncias específicas do modelo.

  ModelAttributes (Episode): Este é o tipo que representa os atributos do modelo. Ele define a estrutura dos dados que serão armazenados no banco de dados. Quando você consulta ou cria um novo registro no banco de dados usando este modelo, os atributos são validados e mapeados de acordo com este tipo.

*/
export const Category = sequelize.define<CategoryInstance, Category>(
  "Category",
  {
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
    position: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }
);
