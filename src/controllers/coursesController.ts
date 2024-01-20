import { Request, Response } from "express";
import { courseService } from "../services/courseService";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { AuthenticadedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";
import { favoriteService } from "../services/favoriteService";

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
  //GET /courses/search
  //Passo 21 - Buscando por cursos
  search: async (req: Request, res: Response) => {
    const { name } = req.query;
    const [page, perPage] = getPaginationParams(req.query);
    try {
      if (typeof name !== "string")
        throw new Error("Name param must be of type string");
      const courses = await courseService.findByName(name, page, perPage);
      return res.json(courses);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },

  //Get /courses/:id
  //Passo 32 - Atualizando o endpoint de cursos foi trocado o tipo de req para AuthenticatedRequest, no passo 18 era Request do express
  show: async (req: AuthenticadedRequest, res: Response) => {
    //Passo 32 - pegando o userId
    const userId = req.user!.id;

    const courseId = req.params.id;
    try {
      const course = await courseService.findByIdWithEpisodes(courseId);
      if (!course)
        return res.status(404).json({ message: "Curso não encontrado" });

      const liked = await likeService.isLiked(userId, +courseId);
      const favorited = await favoriteService.isFavorited(userId, +courseId);
      return res.json({ ...course.get(), liked, favorited });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
  //Passo 33 - Obtendo os 10 cursos mais populares
  //GET /course/popular
  popular: async (req: Request, res: Response) => {
    try {
      const topTen = await courseService.getTopTenByLikes();
      return res.json(topTen);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
};
