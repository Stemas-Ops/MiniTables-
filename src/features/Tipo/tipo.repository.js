import pool from "../../database.js";

export function tipoRepository() {

    return {

        async buscar() {

            const result = await pool.query(`
                SELECT *
                FROM tipo
                ORDER BY id_tipo
            `);

            return result.rows;
        },

        async buscarPorId(id) {

            const result = await pool.query(`
                SELECT *
                FROM tipo
                WHERE id_tipo = $1
            `, [id]);

            return result.rows[0];
        },

        async buscarPorNome(nome) {

            const result = await pool.query(`
                SELECT *
                FROM tipo
                WHERE nome = $1
            `, [nome]);

            return result.rows[0];
        },

        async criar({ nome }) {

            const result = await pool.query(`
                INSERT INTO tipo (nome)

                VALUES ($1)

                RETURNING *
            `, [nome]);

            return result.rows[0];
        },

        async atualizar(id, { nome }) {

            const result = await pool.query(`
                UPDATE tipo

                SET nome = $1

                WHERE id_tipo = $2

                RETURNING *
            `, [nome, id]);

            return result.rows[0];
        },

        async deletar(id) {

            await pool.query(`
                DELETE FROM tipo
                WHERE id_tipo = $1
            `, [id]);

        }

    };

}