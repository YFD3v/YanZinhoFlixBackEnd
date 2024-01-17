import { Request, Response } from "express";
import { courseService } from "../services/courseService";

//Passo 18 - obtendo informações do curso
export const coursesController = {
  //GET /courses/featured
  //Passo 19 - obtendo 3 cursos em destaque
  featured: async (req: Request, res: Response) => {
    try {
      const featuredCourses = await courseService.getRandomFeaturedCourses();
      return res.json(featuredCourses);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
  //GET /courses/newest
  //Passo 20 - obtendo cursos lançamentos
  newest: async (req: Request, res: Response) => {
    try {
      const newestCourses = await courseService.getTopTenNewest();
      return res.json(newestCourses);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },

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
