export function pokedexController(service) {

    return {


        async buscar(request, reply) {

            return reply.send(
                await service.buscar()
            );

        },


        async buscarPorId(request, reply) {

            return reply.send(
                await service.buscarPorId(
                    request.params.id
                )
            );

        },


        async criar(request, reply) {

            const pokedex =
                await service.criar(
                    request.body
                );


            return reply
                .status(201)
                .send(pokedex);

        },


        async atualizar(request, reply) {

            const pokedex =
                await service.atualizar(
                    request.params.id,
                    request.body
                );


            return reply.send(pokedex);

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