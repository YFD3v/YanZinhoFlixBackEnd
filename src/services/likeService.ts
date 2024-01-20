//Passo 30 - Criando o gostei
//Service criado apos a migration, model e as relações

import { Like } from "../models";

export const likeService = {
  create: async (userId: number, courseId: number) => {
    const like = await Like.create({ userId, courseId });
    return like;
  },
  //Passo 31 - removendo um gostei
  delete: async (userId: number, courseId: number) => {
    await Like.destroy({
      where: {
        userId,
        courseId,
      },
    });
  },
  //Passo 32 - atualizando o endpoint de cursos
  isLiked: async (userId: number, courseId: number) => {
    const like = await Like.findOne({ where: { userId, courseId } });
    return like !== null ? true : false;
  },
};
