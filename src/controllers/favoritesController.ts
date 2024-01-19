//passo 27 - adicionando favoritos
//Após a criaçaõ da migration, model e relações, e o service

import { Response } from "express";
import { AuthenticadedRequest } from "../middlewares/auth";
import { favoriteSerivce } from "../services/favoriteService";

export const favoritesController = {
  //POST /favorites
  save: async (req: AuthenticadedRequest, res: Response) => {
    const userId = req.user!.id;
    const { courseId } = req.body;
    try {
      const favorite = await favoriteSerivce.create(userId, Number(courseId));
      return res.status(201).json(favorite);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
};
