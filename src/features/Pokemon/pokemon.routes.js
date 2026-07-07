import { pokemonRepository } from "./pokemon.repository.js";
import { treinadorRepository } from "../Treinador/treinador.repository.js";

import { pokemonService } from "./pokemon.service.js";
import { pokemonController } from "./pokemon.controller.js";


export default async function pokemonRoutes(server) {


    const repository = pokemonRepository();


    const treinadorRepo = treinadorRepository();



    const service = pokemonService({

        pokemonRepository: repository,

        treinadorRepository: treinadorRepo

    });



    const controller = pokemonController(service);



    server.get("/", controller.buscar);


    server.get("/:id", controller.buscarPorId);


    server.post("/", controller.criar);


    server.put("/:id", controller.atualizar);


    server.delete("/:id", controller.deletar);


}