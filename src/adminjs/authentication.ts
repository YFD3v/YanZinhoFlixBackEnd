//Passo 11 - autenticação e tela de login
//Passo 14 refatorando
import bcrypt from "bcrypt";
import { AuthenticationOptions } from "@adminjs/express";
import { User } from "../models";
import { ADMINJS_COOKIE_PASSWORD } from "../config/enviroment";

export const authenticationOptions: AuthenticationOptions = {
  authenticate: async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (user && user.role === "admin") {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) return user;
    }
    return false;
  },
  //Antes do passo 40
  // cookiePassword: "senha-do-cookie",
  ////Passo 40 - Depploy aula 2 - fazendo as correções do npm e do adminjs e algumas correções de variaveis de ambiente. Foi instalado o dotenv e env-var e criado o arquivo .env. TRÁS SEGURANÇA
  cookiePassword: ADMINJS_COOKIE_PASSWORD,
};
