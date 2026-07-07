import AppError from "../../Error/AppError.js";

export function pokemonService({
    pokemonRepository,
    treinadorRepository
}) {

    return {

        async buscar() {
            return await pokemonRepository.buscar();
        },

        async buscarPorId(id) {

            const pokemon = await pokemonRepository.buscarPorId(id);

            if (!pokemon) {
                throw new AppError("Pokémon não encontrado.", 404);
            }

            return pokemon;
        },

        async criar(dados) {

            const { nome, nivel, id_treinador } = dados;

            if (!nome || nome.trim() === "") {
                throw new AppError("O nome do Pokémon é obrigatório.", 400);
            }

            if (!nivel || nivel < 1) {
                throw new AppError("O nível deve ser maior que 0.", 400);
            }

            const treinador = await treinadorRepository.buscarPorId(id_treinador);

            if (!treinador) {
                throw new AppError("Treinador não encontrado.", 404);
            }

            return await pokemonRepository.criar(dados);
        },

        async atualizar(id, dados) {

            const pokemon = await pokemonRepository.buscarPorId(id);

            if (!pokemon) {
                throw new AppError("Pokémon não encontrado.", 404);
            }

            if (!dados.nome || dados.nome.trim() === "") {
                throw new AppError("O nome do Pokémon é obrigatório.", 400);
            }

            if (!dados.nivel || dados.nivel < 1) {
                throw new AppError("O nível deve ser maior que 0.", 400);
            }

            const treinador = await treinadorRepository.buscarPorId(dados.id_treinador);

            if (!treinador) {
                throw new AppError("Treinador não encontrado.", 404);
            }

            return await pokemonRepository.atualizar(id, dados);
        },

        async deletar(id) {

            const pokemon = await pokemonRepository.buscarPorId(id);

            if (!pokemon) {
                throw new AppError("Pokémon não encontrado.", 404);
            }

            await pokemonRepository.deletar(id);
        }

    };

}