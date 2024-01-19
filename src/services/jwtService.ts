//Passo 24 - login com json webtoken
import jwt from "jsonwebtoken";

const secret = "chave-do-jwt";

export const jwtService = {
  signToken: (payload: string | object | Buffer, expiration: string) => {
    //Devolvendo o token para o usuário
    return jwt.sign(payload, secret, {
      expiresIn: expiration,
    });
  },

  //Passo 25 - Middleware de autoriazação
  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, secret, callbackfn);
  },
};
