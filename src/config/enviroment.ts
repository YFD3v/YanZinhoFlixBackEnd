////Passo 40 - Depploy aula 2 - fazendo as correções do npm e do adminjs e algumas correções de variaveis de ambiente. Foi instalado o dotenv e env-var e criado o arquivo .env. TRÁS SEGURANÇA
import * as env from "env-var";

export const DATABASE_URL = env.get("DATABASE_URL").required().asString();

export const ADMINJS_COOKIE_PASSWORD = env
  .get("ADMINJS_COOKIE_PASSWORD")
  .required()
  .asString();

export const JWT_KEY = env.get("JWT_KEY").required().asString();
