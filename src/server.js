import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

import AppError from "./Error/AppError.js";
import pool from "./database.js";

import pokemonRoutes from "./features/Pokemon/pokemon.routes.js";
import treinadorRoutes from "./features/Treinador/treinador.routes.js";
import tipoRoutes from "./features/Tipo/tipo.routes.js";
import pokedexRoutes from "./features/Pokedex/pokedex.routes.js";

const server = Fastify({
    logger: true
});

server.register(swagger, {
    openapi: {
        info: {
            title: "MiniTables Pokémon API",
            description: "API REST para gerenciamento de Pokémon, Treinadores, Tipos e Pokédex.",
            version: "1.0.0"
        },
            servers: [
            {
            url: "http://localhost:3333",
            description: "Servidor local"
            }
    ]
    }
});

server.register(swaggerUI, {
    routePrefix: "/docs"
});

server.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
});

server.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
            status: "error",
            message: error.message
        });
    }

    if (error.validation) {
        return reply.status(400).send({
            status: "error",
            message: "Erro de validação dos dados enviados."
        });
    }

    request.log.error(error);

    return reply.status(500).send({
        status: "error",
        message: "Erro interno do servidor."
    });
});

server.register(pokemonRoutes, { prefix: "/pokemon" });
server.register(treinadorRoutes, { prefix: "/treinador" });
server.register(tipoRoutes, { prefix: "/tipo" });
server.register(pokedexRoutes, { prefix: "/pokedex" });

const PORT = process.env.PORT || 3333;

const start = async () => {
    try {
        await pool.query("SELECT 1");

        console.log("✅ Banco conectado com sucesso!");

        await server.listen({
            port: PORT,
            host: "0.0.0.0"
        });

        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        console.log(`📄 Swagger em http://localhost:${PORT}/docs`);
    } catch (error) {
        console.error("Erro ao iniciar o servidor:");
        console.error(error);
        process.exit(1);
    }
};

start();