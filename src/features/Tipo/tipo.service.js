import AppError from "../../Error/AppError.js";

export function tipoService({
    tipoRepository
}) {

    return {

        async buscar() {
            return await tipoRepository.buscar();
        },

        async buscarPorId(id) {

            const tipo = await tipoRepository.buscarPorId(id);

            if (!tipo) {
                throw new AppError("Tipo não encontrado.", 404);
            }

            return tipo;
        },

        async criar(dados) {

            if (!dados.nome || dados.nome.trim() === "") {
                throw new AppError("O nome do tipo é obrigatório.", 400);
            }

            const tipoExistente = await tipoRepository.buscarPorNome(dados.nome);

            if (tipoExistente) {
                throw new AppError("Esse tipo já existe.", 409);
            }

            return await tipoRepository.criar(dados);
        },

        async atualizar(id, dados) {

            const tipo = await tipoRepository.buscarPorId(id);

            if (!tipo) {
                throw new AppError("Tipo não encontrado.", 404);
            }

            if (!dados.nome || dados.nome.trim() === "") {
                throw new AppError("O nome do tipo é obrigatório.", 400);
            }

            const tipoExistente = await tipoRepository.buscarPorNome(dados.nome);

            if (tipoExistente && tipoExistente.id_tipo != id) {
                throw new AppError("Já existe um tipo com esse nome.", 409);
            }

            return await tipoRepository.atualizar(id, dados);
        },

        async deletar(id) {

            const tipo = await tipoRepository.buscarPorId(id);

            if (!tipo) {
                throw new AppError("Tipo não encontrado.", 404);
            }

            await tipoRepository.deletar(id);
        }

    };

}