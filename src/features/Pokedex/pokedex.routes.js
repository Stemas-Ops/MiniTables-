import { pokedexRepository } from "./pokedex.repository.js";
import { treinadorRepository } from "../Treinador/treinador.repository.js";

import { pokedexService } from "./pokedex.service.js";
import { pokedexController } from "./pokedex.controller.js";


export default async function pokedexRoutes(server) {


    const repository = pokedexRepository();

    const treinadorRepo = treinadorRepository();



    const service = pokedexService({

        pokedexRepository: repository,

        treinadorRepository: treinadorRepo

    });



    const controller = pokedexController(service);



    server.get("/", controller.buscar);

    server.get("/:id", controller.buscarPorId);

    server.post("/", controller.criar);

    server.put("/:id", controller.atualizar);

    server.delete("/:id", controller.deletar);


}