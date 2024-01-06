// Quinto passo - foi criada a migration da tabela courses, e agora estamos fazendo a forma de nos conectarmos com ela

import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

//Define a estrutura de dados que representa o curso
export interface Course {
  id: number;
  name: string;
  synopsis: string;
  thumbnailUrl: string;
  featured: boolean;
  categoryId: number;
}

//Utilizada para representar os atributos de criação de um curso, permitindo que algumas propriedades sejam opcionais durante a criação. Por exemplo, pode ser útil ao criar um novo curso sem especificar um ID (que geralmente é gerado automaticamente), uma imagem em miniatura ou o status de destaque.
export interface CourseCreationAttributes
  extends Optional<Course, "id" | "thumbnailUrl" | "featured"> {}

//Utilizada para representar uma instância específica de um curso que pode ser manipulada no contexto do modelo de dados definido pela interface Course e CourseCreationAttributes. Incorpora tanto as propriedades do curso como aquelas definidas para a criação.
//representa um objeto que segue as definições do curso e seus atributos de criação, permitindo interações e manipulações no contexto do modelo ORM.

export interface CourseInstance
  extends Model<Course, CourseCreationAttributes>,
    Course {}

//Fazendo a mesma coisa que fizemos na migration, porém, no contexto da aplicação
//definindo uma padrão à ser seguido quando se desejar inserir dados na tabela

export const Course = sequelize.define<CourseInstance, Course>("Course", {
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
  thumbnailUrl: {
    type: DataTypes.STRING,
  },
  featured: {
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "categories", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
});
