import AppError from "../../Error/AppError.js";

export function pokedexService({
    pokedexRepository,
    treinadorRepository
}) {

    return {

        async buscar() {
            return await pokedexRepository.buscar();
        },

        async buscarPorId(id) {

            const pokedex = await pokedexRepository.buscarPorId(id);

            if (!pokedex) {
                throw new AppError("Pokédex não encontrada.", 404);
            }

            return pokedex;
        },

        async criar(dados) {

            const treinador = await treinadorRepository.buscarPorId(dados.id_treinador);

            if (!treinador) {
                throw new AppError("Treinador não encontrado.", 404);
            }

            const pokedexExistente = await pokedexRepository.buscarPorTreinador(
                dados.id_treinador
            );

            if (pokedexExistente) {
                throw new AppError(
                    "Este treinador já possui uma Pokédex.",
                    409
                );
            }

            return await pokedexRepository.criar(dados);
        },

        async atualizar(id, dados) {

            const pokedex = await pokedexRepository.buscarPorId(id);

            if (!pokedex) {
                throw new AppError("Pokédex não encontrada.", 404);
            }

            const treinador = await treinadorRepository.buscarPorId(dados.id_treinador);

            if (!treinador) {
                throw new AppError("Treinador não encontrado.", 404);
            }

            return await pokedexRepository.atualizar(id, dados);
        },

        async deletar(id) {

            const pokedex = await pokedexRepository.buscarPorId(id);

            if (!pokedex) {
                throw new AppError("Pokédex não encontrada.", 404);
            }

            await pokedexRepository.deletar(id);
        }

    };

}