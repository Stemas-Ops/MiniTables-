export function tipoController(service) {

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

            const tipo =
                await service.criar(
                    request.body
                );


            return reply
                .status(201)
                .send(tipo);

        },


        async atualizar(request, reply) {

            const tipo =
                await service.atualizar(
                    request.params.id,
                    request.body
                );


            return reply.send(tipo);

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