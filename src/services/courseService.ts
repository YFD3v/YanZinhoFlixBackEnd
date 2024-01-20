import { Op } from "sequelize";
import { Course } from "../models";
//Passo 18 - obtendo informações do curso
export const courseService = {
  findByIdWithEpisodes: async (id: string) => {
    const courseWithEpisodes = await Course.findByPk(id, {
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      include: {
        //A forma padrão do sequelize fazer a associação é pegando o nome que criamos e colocar no plura
        //Ex: Episode -> Episodes . Olhe em models/index.ts
        association: "episodes",
        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          ["video_url", "videoUrl"],
          ["seconds_long", "secondsLong"],
        ],
        order: [["order", "ASC"]],
        //Essa propriedade é necessária quando estamos utilizando o order
        separate: true,
      },
    });
    return courseWithEpisodes;
  },
  //Passo 19 - obtendo 3 cursos em destaque
  getRandomFeaturedCourses: async () => {
    const featuredCourses = await Course.findAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: {
        featured: true,
      },
    });
    const randomFeaturedCourses = featuredCourses.sort(
      () => 0.5 - Math.random()
    );
    return randomFeaturedCourses.slice(0, 3);
  },
  //Passo 20 - Obtendo cursos lançamentos
  getTopTenNewest: async () => {
    const courses = await Course.findAll({
      limit: 10,
      order: [["created_at", "DESC"]],
    });
    return courses;
  },
  //Passo 21 - buscando por cursos
  findByName: async (name: string, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;
    const { count, rows } = await Course.findAndCountAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: {
        //O "[Op.iLike]"  vai pegar qualquer conteúdo que corresponda a string, mesmo que seja só uma parte. Existem tambem o [Op.like], mas o ilike é insensível à caixa alta.
        name: {
          //As porcentagems tem uma função: se só tiver a porcentagem no final, quer dizer que queremos que comece com determinado termo, se não tiver queremos que termine. Mas como queremos ver em qualquer lugar da string usamos entre porcentagens.
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: perPage,
      offset,
    });
    return {
      courses: rows,
      page,
      perPage,
      total: count,
    };
  },
  //Passo 33 - obtendo os 10 cursos mais populares
  getTopTenByLikes: async () => {
    //Query manual mais complexa para pegar os cursos com mais likes
    const result = await Course.sequelize?.query(`
    SELECT
      courses.id,
      courses.name,
      courses.synopsis,
      courses.thumbnail_url as thumbnailUrl,
      COUNT(users.id) AS likes
    FROM courses
      LEFT OUTER JOIN likes
        ON courses.id = likes.course_id
        INNER JOIN users
          ON users.id = likes.user_id
    GROUP BY courses.id
    ORDER BY likes DESC
    LIMIT 10;
  `);
    if (!result) return null;
    const [topTen] = result;
    return topTen;
  },
};
