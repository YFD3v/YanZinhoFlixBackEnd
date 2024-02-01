//Passo 24 - login com json webtoken
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/enviroment";
//Antes do passo 40, no passo 40 foi substituido o secret pelo JWT_KEy
// const secret = "chave-do-jwt";
//Passo 40 - Depploy aula 2 - fazendo as correções do npm e do adminjs e algumas correções de variaveis de ambiente. Foi instalado o dotenv e env-var e criado o arquivo .env. TRÁS SEGURANÇA.

export const jwtService = {
  signToken: (payload: string | object | Buffer, expiration: string) => {
    //Devolvendo o token para o usuário
    return jwt.sign(payload, JWT_KEY, {
      expiresIn: expiration,
    });
  },

  //Passo 25 - Middleware de autoriazação
  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, JWT_KEY, callbackfn);
  },
};
