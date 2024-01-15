import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
//Passo 10 criação da tabela usuarios

//Definindo a estrutura de dados

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birth: Date;
  email: string;
  password: string;
  role: "admin" | "user";
}
//Utilizada para representar os atributos de criação de um usuario, permitindo que algumas propriedades sejam opcionais durante a criação. Por exemplo, pode ser útil ao criar um novo usuario sem especificar um ID (que geralmente é gerado automaticamente).
export interface UserCreationAttributes extends Optional<User, "id"> {}

//Utilizada para representar uma instância específica de um usuário que pode ser manipulada no contexto do modelo de dados definido pela interface User e UserCreationAttributres. Incorpora tanto as propriedades do usuário como aquelas definidas para a criação.
//representa um objeto que segue as definições do usuário e seus atributos de criação, permitindo interações e manipulações no contexto do modelo ORM.
export interface UserInstance
  extends Model<User, UserCreationAttributes>,
    User {}

//Fazendo a mesma coisa que fizemos na migration, porém, no contexto da aplicação
//definindo uma padrão à ser seguido quando se desejar inserir dados na tabela

//Em relação à esse tipo genérico: O primeiro parâmetro UserInstance informa ao Sequelize que as instâncias desse modelo seguirão a estrutura definida por UserInstance.
// O segundo parâmetro User é usado para fornecer informações sobre a estrutura da tabela no banco de dados.
export const User = sequelize.define<UserInstance, User>(
  "User",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    birth: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isIn: [["admin", "user"]],
      },
    },
  },
  {
    //Realizando a criptografia da senha
    //Instalei as bibliotesca bcrypt e @types/bcrypt
    hooks: {
      beforeSave: async (user) => {
        if (user.isNewRecord || user.changed("password")) {
          user.password = await bcrypt.hash(user.password.toString(), 10);
        }
      },
    },
  }
);
