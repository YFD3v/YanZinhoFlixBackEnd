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

//Utilizada para representar uma instância específica de um categoria que pode ser manipulada no contexto do modelo de dados definido pela interface Category e CategoryCreationAttributes. Incorpora tanto as propriedades do categoria como aquelas definidas para a criação.
//representa um objeto que segue as definições da categoria e seus atributos de criação, permitindo interações e manipulações no contexto do modelo ORM.
export interface CategoryInstance
  extends Model<Category, CategoryCreationAttributes>,
    Category {}

//Fazendo a mesma coisa que fizemos na migration, porém, no contexto da aplicação
//definindo uma padrão à ser seguido quando se desejar inserir dados na tabela

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
