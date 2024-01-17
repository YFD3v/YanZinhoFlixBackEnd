import { Course } from "../models";
//Passo 18 - obtendo informações do curso
export const courseService = {
  findByIdWithEpisodes: async (id: string) => {
    const courseWithEpisodes = await Course.findByPk(id, {
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      include: {
        //A forma padrão do sequelize fazer a associação é pegando o nome que criamos e colocar no plura
        //Ex: Episode -> Episodes . Olhe em models/index.ts
        association: "Episodes",
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
};
