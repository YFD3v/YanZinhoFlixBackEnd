//passo 27 - adicionando favoritos
//Após a criaçaõ da migration, model e relações, e o service

import { Response } from "express";
import { AuthenticadedRequest } from "../middlewares/auth";
import { favoriteService } from "../services/favoriteService";

export const favoritesController = {
  //POST /favorites
  save: async (req: AuthenticadedRequest, res: Response) => {
    const userId = req.user!.id;
    const { courseId } = req.body;
    try {
      const favorite = await favoriteService.create(userId, Number(courseId));
      return res.status(201).json(favorite);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
  //Passo 28 - obtendo os cursos favoritos
  //GET /favorites
  index: async (req: AuthenticadedRequest, res: Response) => {
    const userId = req.user!.id;
    try {
      const favorites = await favoriteService.findByUserId(userId);
      return res.json(favorites);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
  //Passo 29 - excluindo um favorito
  //DELETE /favorites/:id
  delete: async (req: AuthenticadedRequest, res: Response) => {
    const userId = req.user!.id;
    const courseId = req.params.id;
    try {
      await favoriteService.delete(userId, Number(courseId));
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
};
