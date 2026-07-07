import { tipoRepository } from "./tipo.repository.js";

import { tipoService } from "./tipo.service.js";

import { tipoController } from "./tipo.controller.js";


export default async function tipoRoutes(server) {


    const repository = tipoRepository();


    const service = tipoService({

        tipoRepository: repository

    });


    const controller = tipoController(service);



    server.get("/", controller.buscar);

    server.get("/:id", controller.buscarPorId);

    server.post("/", controller.criar);

    server.put("/:id", controller.atualizar);

    server.delete("/:id", controller.deletar);


}