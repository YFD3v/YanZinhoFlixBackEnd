//Passo 22 Streamimg de vídeo na API
import { Response } from "express";
import path from "path";
import fs from "fs";

export const episodeService = {
  streamEpisodeToResponse: async (
    res: Response,
    videoUrl: string,
    range: string | undefined
  ) => {
    const filePath = path.join(__dirname, "..", "..", "uploads", videoUrl);
    const fileStat = fs.statSync(filePath);

    if (range) {
      //Pegando o trecho do vídeo
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1;
      //Tamanho do pedaço
      const chunckSize = end - start + 1;
      //Lendo o arquivo no pedaço desejado
      const file = fs.createReadStream(filePath, {
        start,
        end,
      });

      //Adicionando cabeçalho da resposta
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunckSize,
        "Content-type": "video/mp4",
      };
      //Esse status code de 206 é para contéudo parcial
      res.writeHead(206, head);

      //Jogando a stream em algum lugar
      file.pipe(res);
    } else {
      //Se ele não passou o range, podemos devolver o vídeo todo
      //Adicionando cabeçalho da resposta
      const head = {
        "Content-Length": fileStat.size,
        "Content-type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  },
};
