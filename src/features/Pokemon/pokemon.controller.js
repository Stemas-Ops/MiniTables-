export function pokemonController(service) {

    return {


        async buscar(request, reply) {

            const pokemons =
                await service.buscar();


            return reply
                .status(200)
                .send(pokemons);

        },


        async buscarPorId(request, reply) {

            const pokemon =
                await service.buscarPorId(
                    request.params.id
                );


            return reply
                .status(200)
                .send(pokemon);

        },


        async criar(request, reply) {

            const pokemon =
                await service.criar(
                    request.body
                );


            return reply
                .status(201)
                .send(pokemon);

        },


        async atualizar(request, reply) {

            const pokemon =
                await service.atualizar(
                    request.params.id,
                    request.body
                );


            return reply
                .status(200)
                .send(pokemon);

        },


        async deletar(request, reply) {

            await service.deletar(
                request.params.id
            );


            return reply
                .status(204)
                .send();

        }

    };

}