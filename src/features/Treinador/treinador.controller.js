export function treinadorController(service) {

    return {


        async buscar(request, reply) {

            const treinadores =
                await service.buscar();


            return reply
                .status(200)
                .send(treinadores);

        },


        async buscarPorId(request, reply) {

            const treinador =
                await service.buscarPorId(
                    request.params.id
                );


            return reply
                .status(200)
                .send(treinador);

        },


        async criar(request, reply) {

            const treinador =
                await service.criar(
                    request.body
                );


            return reply
                .status(201)
                .send(treinador);

        },


        async atualizar(request, reply) {

            const treinador =
                await service.atualizar(
                    request.params.id,
                    request.body
                );


            return reply
                .status(200)
                .send(treinador);

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