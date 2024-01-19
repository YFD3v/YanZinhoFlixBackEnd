import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { Favorite } from "./Favorite";
import { User } from "./User";

//Definindo as associações dos models e das tabelas.

//Quinto passo - definindo a associação entre a categoria e o curso
//Passo 17 - obtendo cursos de uma categoria: adicionou o as: courses
Category.hasMany(Course, { as: "courses" });
Course.belongsTo(Category);

//Setimo passo - deifnindo a associação entre o curso e o epsiodio
Course.hasMany(Episode, { as: "episodes" });
Episode.belongsTo(Course);

//Passso 27 - Adicionadno favoritos, fazendo a associação entre favorites, user e courses
//Associação de muitos para muitos que sera evidenciada no model Favorite
Course.belongsToMany(User, { through: Favorite });
User.belongsToMany(Course, { through: Favorite });
//Associação de cursos para favorite, dizendo quais usuarios favoritaram o curso
Course.hasMany(Favorite, { as: "FavoritesUsers", foreignKey: "course_id" });
Favorite.belongsTo(Course);
//Associação de usuários para favorite, dizendo quais cursos o usuário favoritou
User.hasMany(Favorite, { as: "FavoritesCourses", foreignKey: "user_id" });
Favorite.belongsTo(User);

export { Category, Course, Episode, Favorite, User };
