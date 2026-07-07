import AppError from "../../Error/AppError.js";

export function treinadorService({

    treinadorRepository

}) {

    return {

        async buscar() {

            return await treinadorRepository.buscar();

        },

        async buscarPorId(id) {

            const treinador =
                await treinadorRepository.buscarPorId(id);

            if (!treinador) {
                throw new AppError(
                    "Treinador não encontrado.",
                    404
                );
            }

            return treinador;

        },

        async criar(dados) {

            if (!dados.nome || dados.nome.trim() === "") {
                throw new AppError(
                    "O nome do treinador é obrigatório.",
                    400
                );
            }

            if (
                dados.idade !== undefined &&
                dados.idade < 0
            ) {
                throw new AppError(
                    "A idade não pode ser negativa.",
                    400
                );
            }

            return await treinadorRepository.criar(dados);

        },

        async atualizar(id, dados) {

            const treinador =
                await treinadorRepository.buscarPorId(id);

            if (!treinador) {
                throw new AppError(
                    "Treinador não encontrado.",
                    404
                );
            }

            if (!dados.nome || dados.nome.trim() === "") {
                throw new AppError(
                    "O nome do treinador é obrigatório.",
                    400
                );
            }

            if (
                dados.idade !== undefined &&
                dados.idade < 0
            ) {
                throw new AppError(
                    "A idade não pode ser negativa.",
                    400
                );
            }

            return await treinadorRepository.atualizar(
                id,
                dados
            );

        },

        async deletar(id) {

            const treinador =
                await treinadorRepository.buscarPorId(id);

            if (!treinador) {
                throw new AppError(
                    "Treinador não encontrado.",
                    404
                );
            }

            await treinadorRepository.deletar(id);

        }

    };

}