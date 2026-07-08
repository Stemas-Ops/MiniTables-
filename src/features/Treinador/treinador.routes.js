import { treinadorRepository } from "./treinador.repository.js";
import { treinadorService } from "./treinador.service.js";
import { treinadorController } from "./treinador.controller.js";

import {
    buscarSchema,
    buscarPorIdSchema,
    criarSchema,
    atualizarSchema,
    deletarSchema
} from "./treinador.schema.js";

export default async function treinadorRoutes(server) {
    const repository = treinadorRepository();

    const service = treinadorService({
        treinadorRepository: repository
    });

    const controller = treinadorController(service);

    server.get("/", { schema: buscarSchema }, controller.buscar);
    server.get("/:id", { schema: buscarPorIdSchema }, controller.buscarPorId);
    server.post("/", { schema: criarSchema }, controller.criar);
    server.put("/:id", { schema: atualizarSchema }, controller.atualizar);
    server.delete("/:id", { schema: deletarSchema }, controller.deletar);
}