const erroSchema = {
    type: "object",
    properties: {
        status: { type: "string" },
        message: { type: "string" }
    }
};

const pokedexSchema = {
    type: "object",
    properties: {
        id_pokedex: { type: "integer" },
        id_treinador: { type: "integer" },
        pokemon_favorito: { type: "string" }
    }
};

const idParams = {
    type: "object",
    required: ["id"],
    properties: {
        id: { type: "string" }
    }
};

const pokedexBody = {
    type: "object",
    required: ["id_treinador", "pokemon_favorito"],
    properties: {
        id_treinador: { type: "integer" },
        pokemon_favorito: { type: "string" }
    }
};

export const buscarSchema = {
    tags: ["Pokedex"],
    summary: "Listar Pokédex",
    response: {
        200: {
            type: "array",
            items: pokedexSchema
        }
    }
};

export const buscarPorIdSchema = {
    tags: ["Pokedex"],
    summary: "Buscar Pokédex por ID",
    params: idParams,
    response: {
        200: pokedexSchema,
        404: erroSchema
    }
};

export const criarSchema = {
    tags: ["Pokedex"],
    summary: "Cadastrar Pokédex",
    body: pokedexBody,
    response: {
        201: pokedexSchema,
        400: erroSchema,
        404: erroSchema,
        409: erroSchema
    }
};

export const atualizarSchema = {
    tags: ["Pokedex"],
    summary: "Atualizar Pokédex",
    params: idParams,
    body: pokedexBody,
    response: {
        200: pokedexSchema,
        400: erroSchema,
        404: erroSchema
    }
};

export const deletarSchema = {
    tags: ["Pokedex"],
    summary: "Excluir Pokédex",
    params: idParams,
    response: {
        204: { type: "null" },
        404: erroSchema
    }
};