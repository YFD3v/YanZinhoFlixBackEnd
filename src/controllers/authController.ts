import { Request, Response } from "express";
import { userService } from "../services/userService";
import { jwtService } from "../services/jwtService";
//Passo 23 - registro de usuários

export const authController = {
  //POST /auth/register
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, phone, birth } = req.body;
    try {
      const userAlreadyExists = await userService.findByEmail(email);
      if (userAlreadyExists) throw new Error("Este e-mail já está cadastrado");
      const user = await userService.create({
        firstName,
        lastName,
        email,
        password,
        phone,
        role: "user",
        birth,
      });
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
  //Passo 24 - login com json web token
  //POST /auth/login
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await userService.findByEmail(email);
      if (!user)
        return res.status(404).json({ message: "E-mail não encontrado!" });
      user.checkPassword(password, (err, isSame) => {
        if (err) return res.status(400).json({ message: err.message });
        if (!isSame)
          return res.status(401).json({ message: "Senha incorreta" });

        const payload = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
        };
        //Importante que não coloque muitos dados no payload, pois caso alguem consiga decodificar o token não tenha nenhuma informação crítica
        const token = jwtService.signToken(payload, "7d");
        return res.json({ authenticated: true, payload, token });
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
};
