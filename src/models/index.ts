import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";

//Definindo as associações dos models e das tabelas.

//Quinto passo - definindo a associação entre a categoria e o curso
Category.hasMany(Course);
Course.belongsTo(Category);

//Setimo passo - deifnindo a associação entre o curso e o epsiodio
Course.hasMany(Episode);
Episode.belongsTo(Course);

export { Category, Course, Episode, User };
