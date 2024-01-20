//Passo 25  - middleware de autorização

//Esse middleware serve para proteção de rotas normais, caso o usuário não esteja logado, ou não tenha um token ele não conseguirá acessar as rotas que utilizarmos esse middleware

import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

//Essa interface foi criada para que seja possível setar o req.user
//Sempre que precisar o id para realização do método use AuthenticatedRequest
export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null;
}

//Protegendo as rotas da aplicação
export function ensureAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;
  //Front-end não enviou o token
  if (!authorizationHeader)
    return res
      .status(401)
      .json({ message: "Não autorizado!: token não encontrado" });

  //Formato do token enviado pela requisição: Bearer {token}
  const token = authorizationHeader.replace(/Bearer /, "");
  //Então pegamos assim pegamos so a parte do token
  jwtService.verifyToken(token, async (err, decoded) => {
    if (err || typeof decoded === "undefined")
      return res
        .status(401)
        .json({ message: "Não autorizado: token inválido" });

    //Achando o user por meio do decoded que seria o payload do usuário assim que o usuário é logado
    const user = await userService.findByEmail((decoded as JwtPayload).email);
    req.user = user;
    //Estou utilizando esse next pois, como na rota vão ter mais de um middleware, esse e a do controller, é necessário passar adiante a execução dos middlewares
    next();
  });
}

//Passo 26 - middleware para proteção de videos
export function ensureAuthViaQuery(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { token } = req.query;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Não autorizado: nenhum token encontrado" });
  }

  if (typeof token !== "string") {
    return res
      .status(400)
      .json({ message: "O parâmetro token deve ser do tipo string" });
  }

  jwtService.verifyToken(token, (err, decoded) => {
    if (err || typeof decoded === "undefined") {
      return res
        .status(401)
        .json({ message: "Não autorizado: token inválido" });
    }

    userService.findByEmail((decoded as JwtPayload).email).then((user) => {
      req.user = user;
      next();
    });
  });
}
