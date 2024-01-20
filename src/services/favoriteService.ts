//Passo 27 - adicionando favoritos

import { Favorite } from "../models";

//Criando o service após a criaçaõ do model e das relações no model/index
export const favoriteService = {
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
  //Passo 29 - Excluindo um favorito
  delete: async (userId: number, courseId: number) => {
    await Favorite.destroy({
      where: {
        userId,
        courseId,
      },
    });
  },
  //Passo 32 - Atualizando o endpoint de cursos
  isFavorited: async (userId: number, courseId: number) => {
    const favorite = await Favorite.findOne({ where: { userId, courseId } });
    return favorite !== null;
  },
};
