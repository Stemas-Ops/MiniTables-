// IMPORTAÇÕES

import Fastify from "fastify";
import cors from "@fastify/cors";
import AppError from "./Error/AppError.js";
import pool from "./database.js";

// Rotas
import pokemonRoutes from "./features/Pokemon/pokemon.routes.js";
import treinadorRoutes from "./features/Treinador/treinador.routes.js";
import tipoRoutes from "./features/Tipo/tipo.routes.js";
import pokedexRoutes from "./features/Pokedex/pokedex.routes.js";


// SERVER
const server = Fastify({
    logger: true
});

// CORS

await server.register(cors, {
    origin: "*",
    methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS"
    ]
});

// TRATAMENTO DE ERROS

server.setErrorHandler((error, request, reply) => {

    if (error instanceof AppError) {

        return reply.status(error.statusCode).send({

            status: "error",

            message: error.message

        });

    }

    request.log.error(error);

    return reply.status(500).send({

        status: "error",

        message: "Erro interno do servidor."

    });

});

// ROTAS

server.register(pokemonRoutes, {
    prefix: "/pokemon"
});

server.register(treinadorRoutes, {
    prefix: "/treinador"
});

server.register(tipoRoutes, {
    prefix: "/tipo"
});

server.register(pokedexRoutes, {
    prefix: "/pokedex"
});

// START

const PORT = process.env.PORT || 3000;

const start = async () => {

    try {

        await pool.query("SELECT 1");

        console.log("✅ Banco conectado com sucesso!");

        await server.listen({

            port: PORT,

            host: "0.0.0.0"

        });

        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);

    } catch (error) {

        console.error("Erro ao iniciar o servidor:");

        console.error(error);

        process.exit(1);

    }

};

start();