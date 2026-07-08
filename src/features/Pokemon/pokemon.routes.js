import { pokemonRepository } from "./pokemon.repository.js";
import { treinadorRepository } from "../Treinador/treinador.repository.js";

import { pokemonService } from "./pokemon.service.js";
import { pokemonController } from "./pokemon.controller.js";

import {
    buscarSchema,
    buscarPorIdSchema,
    criarSchema,
    atualizarSchema,
    deletarSchema
} from "./pokemon.schema.js";

export default async function pokemonRoutes(server) {
    const repository = pokemonRepository();
    const treinadorRepo = treinadorRepository();

    const service = pokemonService({
        pokemonRepository: repository,
        treinadorRepository: treinadorRepo
    });

    const controller = pokemonController(service);

    server.get("/", { schema: buscarSchema }, controller.buscar);
    server.get("/:id", { schema: buscarPorIdSchema }, controller.buscarPorId);
    server.post("/", { schema: criarSchema }, controller.criar);
    server.put("/:id", { schema: atualizarSchema }, controller.atualizar);
    server.delete("/:id", { schema: deletarSchema }, controller.deletar);
}