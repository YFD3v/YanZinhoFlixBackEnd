import { Category } from "./Category";
import { Course } from "./Course";

//Quinto passo - definindo a associação entre a categoria e o curso
Category.hasMany(Course);
Course.belongsTo(Category);

//Definindo as associações dos models e das tabelas.

export { Category, Course };
