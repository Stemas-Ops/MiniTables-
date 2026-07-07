import pool from "../../database.js";

export function treinadorRepository() {

    return {

        async buscar() {

            const result = await pool.query(`
                SELECT *
                FROM treinador
                ORDER BY id_treinador
            `);

            return result.rows;

        },

        async buscarPorId(id) {

            const result = await pool.query(`
                SELECT *
                FROM treinador
                WHERE id_treinador = $1
            `, [id]);

            return result.rows[0];

        },

        async criar({ nome, idade }) {

            const result = await pool.query(`
                INSERT INTO treinador
                (nome, idade)

                VALUES ($1, $2)

                RETURNING *
            `, [nome, idade]);

            return result.rows[0];

        },

        async atualizar(id, { nome, idade }) {

            const result = await pool.query(`
                UPDATE treinador

                SET
                    nome = $1,
                    idade = $2

                WHERE id_treinador = $3

                RETURNING *
            `, [nome, idade, id]);

            return result.rows[0];

        },

        async deletar(id) {

            await pool.query(`
                DELETE FROM treinador
                WHERE id_treinador = $1
            `, [id]);

        }

    };

}