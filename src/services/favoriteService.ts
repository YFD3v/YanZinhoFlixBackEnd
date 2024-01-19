//Passo 27 - adicionando favoritos

import { Favorite } from "../models";

//Criando o service após a criaçaõ do model e das relações no model/index
export const favoriteSerivce = {
  create: async (userId: number, courseId: number) => { 
   const favorite = Favorite.create({
      courseId,
      userId,
    });
    return favorite
  },
};
