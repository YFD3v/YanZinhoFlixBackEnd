//Passo 27 - adicionando favoritos

import { Favorite } from "../models";

//Criando o service após a criaçaõ do model e das relações no model/index
export const favoriteSerivce = {
  create: async (userId: number, courseId: number) => {
    const favorite = Favorite.create({
      courseId,
      userId,
    });
    return favorite;
  },
  //Passo 28 - obtendo os cursos favoritos
  findByUserId: async (userId: number) => {
    const favorites = await Favorite.findAll({
      attributes: [["user_id", "userId"]],
      where: { userId },
      include: {
        association: "Course",
        attributes: [
          "id",
          "name",
          "synopsis",
          ["thumbnail_url", "thumbnailUrl"],
        ],
      },
    });

    return {
      userId,
      courses: favorites.map((favorite) => favorite.Course),
    };
  },
};
