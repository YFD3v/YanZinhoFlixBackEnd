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

//Esta interface representa uma instância específica do modelo de curso que pode ser manipulada no contexto do modelo de dados definido por Course e CourseCreationAttributes. Ela estende tanto a interface Model quanto a Course, incorporando as propriedades e métodos associados ao modelo Sequelize. Isso inclui métodos como create, update, entre outros.

export interface CourseInstance
  extends Model<Course, CourseCreationAttributes>,
    Course {}

//Fazendo a mesma coisa que fizemos na migration, porém, no contexto da aplicação
//definindo uma padrão à ser seguido quando se desejar inserir dados na tabela

/*
Em relação ao tipo genérico:
  A utilização de tipos genéricos na função sequelize.define tem a finalidade de fornecer informações adicionais ao Sequelize sobre a estrutura do modelo. Vamos analisar a assinatura da função sequelize.define e a explicação dos tipos genéricos no seu exemplo:

  sequelize.define<InstanceType, ModelAttributes>("modelName", attributes)

  InstanceType (EpisodeInstance): Este é o tipo que representa a instância específica do modelo. Ou seja, quando você cria uma instância de "Episode" usando este modelo, ela terá o tipo EpisodeInstance. Isso é útil para ter autocompletar e garantir tipos seguros ao trabalhar com instâncias específicas do modelo.

  ModelAttributes (Episode): Este é o tipo que representa os atributos do modelo. Ele define a estrutura dos dados que serão armazenados no banco de dados. Quando você consulta ou cria um novo registro no banco de dados usando este modelo, os atributos são validados e mapeados de acordo com este tipo.

*/
// O segundo parâmetro Course é usado para fornecer informações sobre a estrutura da tabela no banco de dados.
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
