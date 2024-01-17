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
};
