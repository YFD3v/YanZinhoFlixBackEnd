//Passo 11 - autenticação e tela de login
//Passo 14 refatorando
import bcrypt from "bcrypt";
import { AuthenticationOptions } from "@adminjs/express";
import { User } from "../models";

export const authenticationOptions: AuthenticationOptions = {
  authenticate: async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (user && user.role === "admin") {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) return user;
    }
    return false;
  },
  cookiePassword: "senha-do-cookie",
  //Para se livrar dos avisos deprecated do express-session (abaixo)
};
