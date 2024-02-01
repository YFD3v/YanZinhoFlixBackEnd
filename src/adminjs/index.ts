//Terceiro passo - configurando o adminjs( painel )

import AdminJS from "adminjs";
import { default as AdminJsExpress } from "@adminjs/express";
import { default as AdminJsSequelize } from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { locale } from "./locale";
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import { authenticationOptions } from "./authentication";
//Passo 40.1 - foi instalado o connect-session-sequelize e -D @types/express-session, poís quando a aplicaçaõ esta no modo produção há um problema com a forma de armazenamento da sessão
import session from "express-session";
import connectSession from "connect-session-sequelize";
import { ADMINJS_COOKIE_PASSWORD } from "../config/enviroment";
const SequelizeStore = connectSession(session.Store);
const store = new SequelizeStore({ db: sequelize });
store.sync();

/*
  O fato de o adminjs conseguir realizar as operações CRUD sem necessariamente haver uma rota específica é devido a registrar o adaptador na linha 20 e definir o 
  database como a instancia do sequelize na linha 24.
  
  O AdminJS, por padrão, utiliza as convenções do Sequelize para realizar operações CRUD sem a necessidade de rotas específicas para cada operação. Ele cria automaticamente as rotas necessárias para manipulação de recursos com base nos modelos Sequelize.
*/

// Adaptador da ORM
AdminJS.registerAdapter(AdminJsSequelize);

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  //Esse resources são todas as resources juntas
  resources: adminJsResources,
  branding: brandingOptions,
  //Passo 12 adicionando tradução
  locale: locale,
  //Passo 13 personalizando o dashboard
  dashboard: dashboardOptions,
});
//Anteriormente era: export const adminJsRouter = AdminJsExpress.buildRouter(adminjs)
//Passo 11 - autenticação e tela de login
export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(
  adminJs,
  authenticationOptions,
  null,
  {
    //sessão não será salva novamente no armazenamento
    resave: false,
    //significa que as sessões não serão salvas para solicitações que não modificaram os dados da sessão
    saveUninitialized: false,
    //Passo 40.1
    store: store,
    secret: ADMINJS_COOKIE_PASSWORD,
  }
);
