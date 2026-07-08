import { pokedexRepository } from "./pokedex.repository.js";
import { treinadorRepository } from "../Treinador/treinador.repository.js";

import { pokedexService } from "./pokedex.service.js";
import { pokedexController } from "./pokedex.controller.js";

import {
    buscarSchema,
    buscarPorIdSchema,
    criarSchema,
    atualizarSchema,
    deletarSchema
} from "./pokedex.schema.js";

export default async function pokedexRoutes(server) {
    const repository = pokedexRepository();
    const treinadorRepo = treinadorRepository();

    const service = pokedexService({
        pokedexRepository: repository,
        treinadorRepository: treinadorRepo
    });

    const controller = pokedexController(service);

    server.get("/", { schema: buscarSchema }, controller.buscar);
    server.get("/:id", { schema: buscarPorIdSchema }, controller.buscarPorId);
    server.post("/", { schema: criarSchema }, controller.criar);
    server.put("/:id", { schema: atualizarSchema }, controller.atualizar);
    server.delete("/:id", { schema: deletarSchema }, controller.deletar);
}