import { treinadorRepository } from "./treinador.repository.js";
import { treinadorService } from "./treinador.service.js";
import { treinadorController } from "./treinador.controller.js";


export default async function treinadorRoutes(server) {


    const repository = treinadorRepository();


    const service = treinadorService({
        treinadorRepository: repository
    });


    const controller = treinadorController(service);



    server.get("/", controller.buscar);


    server.get("/:id", controller.buscarPorId);


    server.post("/", controller.criar);


    server.put("/:id", controller.atualizar);


    server.delete("/:id", controller.deletar);


}