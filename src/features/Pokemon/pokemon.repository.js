import pool from "../../database.js";

export function pokemonRepository() {

    return {

        async buscar() {

            const result = await pool.query(`
                SELECT *
                FROM pokemon
                ORDER BY id_pokemon
            `);

            return result.rows;
        },

        async buscarPorId(id) {

            const result = await pool.query(`
                SELECT *
                FROM pokemon
                WHERE id_pokemon = $1
            `, [id]);

            return result.rows[0];
        },

        async criar({ nome, nivel, id_treinador }) {

            const result = await pool.query(`
                INSERT INTO pokemon
                (nome, nivel, id_treinador)

                VALUES ($1,$2,$3)

                RETURNING *
            `, [nome, nivel, id_treinador]);

            return result.rows[0];
        },

        async atualizar(id, { nome, nivel, id_treinador }) {

            const result = await pool.query(`
                UPDATE pokemon

                SET
                    nome=$1,
                    nivel=$2,
                    id_treinador=$3

                WHERE id_pokemon=$4

                RETURNING *
            `, [nome, nivel, id_treinador, id]);

            return result.rows[0];
        },

        async deletar(id) {

            await pool.query(`
                DELETE FROM pokemon
                WHERE id_pokemon=$1
            `, [id]);

        }

    }

}