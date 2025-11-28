import { createBrowserRouter } from "react-router";
import App from "../App";
import Inicio from "../pages/inicio";
import pagina404 from "../pages/pagina404";
import Personajes from "../pages/Personajes";
import Planetas from "../pages/Planetas";
import Perfil from "../pages/perfil";

export const routes=createBrowserRouter([
  {path:'',Component:App,children:[
    {path:'',Component:Inicio},
    {path:'personajes',Component:Personajes},
    {path:'planetas',Component:Planetas},
    {path:'personajes/perfil/:id',Component:Perfil},
    {path:'*',Component:pagina404}
  ],}
  
],
);