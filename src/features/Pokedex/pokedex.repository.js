import pool from "../../database.js";

export function pokedexRepository() {

    return {

        async buscar() {

            const result = await pool.query(`
                SELECT *
                FROM pokedex
                ORDER BY id_pokedex
            `);

            return result.rows;

        },

        async buscarPorId(id) {

            const result = await pool.query(`
                SELECT *
                FROM pokedex
                WHERE id_pokedex = $1
            `, [id]);

            return result.rows[0];

        },

        async buscarPorTreinador(idTreinador) {

            const result = await pool.query(`
                SELECT *
                FROM pokedex
                WHERE id_treinador = $1
            `, [idTreinador]);

            return result.rows[0];

        },

        async criar({ id_treinador, pokemon_favorito }) {

            const result = await pool.query(`
                INSERT INTO pokedex
                (id_treinador, pokemon_favorito)

                VALUES ($1,$2)

                RETURNING *
            `, [id_treinador, pokemon_favorito]);

            return result.rows[0];

        },

        async atualizar(id, { id_treinador, pokemon_favorito }) {

            const result = await pool.query(`
                UPDATE pokedex

                SET
                    id_treinador = $1,
                    pokemon_favorito = $2

                WHERE id_pokedex = $3

                RETURNING *
            `, [id_treinador, pokemon_favorito, id]);

            return result.rows[0];

        },

        async deletar(id) {

            await pool.query(`
                DELETE FROM pokedex
                WHERE id_pokedex = $1
            `, [id]);

        }

    }

}