import { tipoRepository } from "./tipo.repository.js";
import { tipoService } from "./tipo.service.js";
import { tipoController } from "./tipo.controller.js";

import {
    buscarSchema,
    buscarPorIdSchema,
    criarSchema,
    atualizarSchema,
    deletarSchema
} from "./tipo.schema.js";

export default async function tipoRoutes(server) {
    const repository = tipoRepository();

    const service = tipoService({
        tipoRepository: repository
    });

    const controller = tipoController(service);

    server.get("/", { schema: buscarSchema }, controller.buscar);
    server.get("/:id", { schema: buscarPorIdSchema }, controller.buscarPorId);
    server.post("/", { schema: criarSchema }, controller.criar);
    server.put("/:id", { schema: atualizarSchema }, controller.atualizar);
    server.delete("/:id", { schema: deletarSchema }, controller.deletar);
}