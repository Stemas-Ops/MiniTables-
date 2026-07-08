const erroSchema = {
    type: "object",
    properties: {
        status: { type: "string" },
        message: { type: "string" }
    }
};

const pokemonSchema = {
    type: "object",
    properties: {
        id_pokemon: { type: "integer" },
        nome: { type: "string" },
        nivel: { type: "integer" },
        id_treinador: { type: "integer" }
    }
};

const idParams = {
    type: "object",
    required: ["id"],
    properties: {
        id: { type: "string" }
    }
};

const pokemonBody = {
    type: "object",
    required: ["nome", "nivel", "id_treinador"],
    properties: {
        nome: { type: "string" },
        nivel: { type: "integer" },
        id_treinador: { type: "integer" }
    }
};

export const buscarSchema = {
    tags: ["Pokemon"],
    summary: "Listar Pokémon",
    response: {
        200: {
            type: "array",
            items: pokemonSchema
        }
    }
};

export const buscarPorIdSchema = {
    tags: ["Pokemon"],
    summary: "Buscar Pokémon por ID",
    params: idParams,
    response: {
        200: pokemonSchema,
        404: erroSchema
    }
};

export const criarSchema = {
    tags: ["Pokemon"],
    summary: "Cadastrar Pokémon",
    body: pokemonBody,
    response: {
        201: pokemonSchema,
        400: erroSchema,
        404: erroSchema
    }
};

export const atualizarSchema = {
    tags: ["Pokemon"],
    summary: "Atualizar Pokémon",
    params: idParams,
    body: pokemonBody,
    response: {
        200: pokemonSchema,
        400: erroSchema,
        404: erroSchema
    }
};

export const deletarSchema = {
    tags: ["Pokemon"],
    summary: "Excluir Pokémon",
    params: idParams,
    response: {
        204: { type: "null" },
        404: erroSchema
    }
};