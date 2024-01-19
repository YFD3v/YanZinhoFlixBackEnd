//Passo 30 - Criando o gostei
//Fazendo isso depois da migration,model,relações e service

import { Response } from "express";
import { AuthenticadedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";

export const likesController = {
  //POST  /likes
  save: async (req: AuthenticadedRequest, res: Response) => {
    const userId = req.user!.id;
    //Uma dica para saber quando usar o req.body é pensar o seguinte:
    /*
      Ao fazer a ação que eu quero, eu vou esta enviando um formulário? 
      Se sim use req.body - Comumente associada as requisições POST PUT E DELETE
      Ao fazer a ação que eu quero, a informação vai vir pela url?
      Se sim use req.params - Ex: "/rota/:id"
      Ao fazer a ação que eu quero, a informação vai está no corpo da página?
      Se sim use req.query - Ao utilizar a conotação "?" na url
    */
    const { courseId } = req.body;
    try {
      const like = await likeService.create(userId, courseId);
      return res.status(201).json(like);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
  //Passo 31 - Removendo um gostei
  //DELETE  /likes/:id
  delete: async (req: AuthenticadedRequest, res: Response) => {
    const userId = req.user!.id;
    const courseId = req.params.id;
    try {
      await likeService.delete(userId, Number(courseId));
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
};
