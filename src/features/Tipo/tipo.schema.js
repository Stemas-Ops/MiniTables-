const erroSchema = {
    type: "object",
    properties: {
        status: { type: "string" },
        message: { type: "string" }
    }
};

const tipoSchema = {
    type: "object",
    properties: {
        id_tipo: { type: "integer" },
        nome: { type: "string" }
    }
};

const idParams = {
    type: "object",
    required: ["id"],
    properties: {
        id: { type: "string" }
    }
};

const tipoBody = {
    type: "object",
    required: ["nome"],
    properties: {
        nome: { type: "string" }
    }
};

export const buscarSchema = {
    tags: ["Tipo"],
    summary: "Listar tipos",
    response: {
        200: {
            type: "array",
            items: tipoSchema
        }
    }
};

export const buscarPorIdSchema = {
    tags: ["Tipo"],
    summary: "Buscar tipo por ID",
    params: idParams,
    response: {
        200: tipoSchema,
        404: erroSchema
    }
};

export const criarSchema = {
    tags: ["Tipo"],
    summary: "Cadastrar tipo",
    body: tipoBody,
    response: {
        201: tipoSchema,
        400: erroSchema,
        409: erroSchema
    }
};

export const atualizarSchema = {
    tags: ["Tipo"],
    summary: "Atualizar tipo",
    params: idParams,
    body: tipoBody,
    response: {
        200: tipoSchema,
        400: erroSchema,
        404: erroSchema,
        409: erroSchema
    }
};

export const deletarSchema = {
    tags: ["Tipo"],
    summary: "Excluir tipo",
    params: idParams,
    response: {
        204: { type: "null" },
        404: erroSchema
    }
};