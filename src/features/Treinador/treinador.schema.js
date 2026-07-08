const erroSchema = {
    type: "object",
    properties: {
        status: { type: "string" },
        message: { type: "string" }
    }
};

const treinadorSchema = {
    type: "object",
    properties: {
        id_treinador: { type: "integer" },
        nome: { type: "string" },
        idade: { type: "integer" }
    }
};

const idParams = {
    type: "object",
    required: ["id"],
    properties: {
        id: { type: "string" }
    }
};

const treinadorBody = {
    type: "object",
    required: ["nome", "idade"],
    properties: {
        nome: { type: "string" },
        idade: { type: "integer" }
    }
};

export const buscarSchema = {
    tags: ["Treinador"],
    summary: "Listar treinadores",
    response: {
        200: {
            type: "array",
            items: treinadorSchema
        }
    }
};

export const buscarPorIdSchema = {
    tags: ["Treinador"],
    summary: "Buscar treinador por ID",
    params: idParams,
    response: {
        200: treinadorSchema,
        404: erroSchema
    }
};

export const criarSchema = {
    tags: ["Treinador"],
    summary: "Cadastrar treinador",
    body: treinadorBody,
    response: {
        201: treinadorSchema,
        400: erroSchema
    }
};

export const atualizarSchema = {
    tags: ["Treinador"],
    summary: "Atualizar treinador",
    params: idParams,
    body: treinadorBody,
    response: {
        200: treinadorSchema,
        400: erroSchema,
        404: erroSchema
    }
};

export const deletarSchema = {
    tags: ["Treinador"],
    summary: "Excluir treinador",
    params: idParams,
    response: {
        204: { type: "null" },
        404: erroSchema
    }
};