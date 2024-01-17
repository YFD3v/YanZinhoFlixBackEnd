import { Request, Response } from "express";
import { courseService } from "../services/courseService";

//Passo 18 - obtendo informações do curso
export const coursesController = {
  //Get /courses/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const course = await courseService.findByIdWithEpisodes(id);
      res.json(course);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
};
