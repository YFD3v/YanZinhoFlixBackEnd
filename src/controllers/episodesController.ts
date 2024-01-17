//Passo 22 - Streaming de video na api
import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";

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
};
