//Passo 22 - Streaming de video na api
import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const episodesController = {
  // GET /episodes/stream?videoUrl=
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query;
    try {
      if (typeof videoUrl !== "string")
        throw new Error("videoUrl param must be of type string");

      //Esse range serve para fazer o envio de blocos do vídeo, por exemplo:
      //No youtube o vídeo não é carregado completamente, há um barra que mostra o quanto o video foi carregado. Para uma melhor otimização.
      //Esse valor range ja vem no cabeçalho da requisição
      const range = req.headers.range; // bytes= 0-1024. O byte do arquivo que o usuário está;
      episodeService.streamEpisodeToResponse(res, videoUrl, range);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
  //Passo 34 - adicionando o progresso de um episodio
  //GET /episodes/:id/watchTime
  getWatchTime: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const episodeId = req.params.id;
    try {
      const watchTime = await episodeService.getWatchTime(userId, +episodeId);
      return res.json(watchTime);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
  //Passo 34 - POST /episodes/:id/watchTime
  setWatchTime: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const episodeId = Number(req.params.id);
    const { seconds } = req.body;
    console.log(userId, episodeId, seconds);
    try {
      const watchTime = await episodeService.setWatchTime({
        episodeId,
        userId,
        seconds,
      });
      return res.json(watchTime);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
};
