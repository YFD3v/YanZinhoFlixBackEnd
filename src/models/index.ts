import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { Favorite } from "./Favorite";
import { Like } from "./Like";
import { User } from "./User";
import { WatchTime } from "./WatchTime";

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
//Associação de cursos para favorite, dizendo quais usuarios favoritaram o curso. Um curso pode ter muitos registros na tabela Favorite. A opção foreignKey: "course_id" especifica que a chave estrangeira na tabela Favorite relacionada ao Course é chamada course_id.
Course.hasMany(Favorite, { as: "FavoritesUsers", foreignKey: "course_id" });
Favorite.belongsTo(Course);
//Associação de usuários para favorite, dizendo quais cursos o usuário favoritou. Um usuário pode ter muitos registros na tabela Favorite. A opção foreignKey: "user_id" especifica que a chave estrangeira na tabela Favorite relacionada ao User é chamada user_id.
User.hasMany(Favorite, { as: "FavoritesCourses", foreignKey: "user_id" });
Favorite.belongsTo(User);

//Passo 30 - Criando o gostei
//Associação de muitos para muitos, fazendo a associação entre likes, user e course
Course.belongsToMany(User, { through: Like });
User.belongsToMany(Course, { through: Like });

//Passo 34 - Adicionando o progresso de um episodio
//Fazendo a mesma ideia que fiz com o Like
Episode.belongsToMany(User, { through: WatchTime });
User.belongsToMany(Episode, { through: WatchTime });

export { Category, Course, Episode, Favorite, Like, User, WatchTime };
