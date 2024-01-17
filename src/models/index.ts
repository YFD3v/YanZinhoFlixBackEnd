import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";

//Definindo as associações dos models e das tabelas.

//Quinto passo - definindo a associação entre a categoria e o curso
//Passo 17 - obtendo cursos de uma categoria: adicionou o as: courses
Category.hasMany(Course, { as: "courses" });
Course.belongsTo(Category);

//Setimo passo - deifnindo a associação entre o curso e o epsiodio
Course.hasMany(Episode, { as: "episodes" });
Episode.belongsTo(Course);

export { Category, Course, Episode, User };
