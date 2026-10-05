import {Router} from "express";
import TarefaController from "../Controllers/TarefaController.js";
import UserMiddleware from "../Middleware/UserMiddleware.js";

const routesTarefa = new Router();

routesTarefa.post("/createTarefa", UserMiddleware ,TarefaController.Create);
routesTarefa.get("/getAll", UserMiddleware ,TarefaController.getAll);
routesTarefa.patch("/atualizarStatus/:id", UserMiddleware, TarefaController.UpdateStatus);

export default routesTarefa;