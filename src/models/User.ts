import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
import { EpisodeInstance } from "./Episode";
//Passo 10 criação da tabela usuarios

//Passo 24 - login com jsonwebtoken
type CheckPasswordCallback = (
  err?: Error | undefined,
  isSame?: boolean
) => void;

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

//Esta interface representa uma instância específica do modelo de usuário que pode ser manipulada no contexto do modelo de dados definido por User e UserCreationAttributes. Ela estende tanto a interface Model quanto a User, incorporando as propriedades e métodos associados ao modelo Sequelize. Isso inclui métodos como create, update, entre outros.
export interface UserInstance
  extends Model<User, UserCreationAttributes>,
    User {
  //Passo 35 - obtendo a lista de continuar assintindo
  Episodes?: EpisodeInstance[];
  //Passo 24 - login com json webtoken
  checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void;
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
//Passo 24 - Login com json webtoken, instalei o pacote jsonwebtoken e -D @types/jsonwebtoken
//Criando um metódo para o user através do prototype
User.prototype.checkPassword = function (
  password: string,
  callbackfn: CheckPasswordCallback
) {
  bcrypt.compare(password, this.password, (err, isSame) => {
    if (err) {
      //Houve algum erro, a senha não foi a mesma
      callbackfn(err, false);
    } else {
      callbackfn(err, isSame);
    }
  });
};
