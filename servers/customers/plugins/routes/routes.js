const get = {
    method: 'GET',
    url: '/',
    /**
     * @param {import("fastify").FastifyRequest} req 
     * @param {import('fastify').FastifyReply} reply 
     */
    handler: async function (req, reply) {
        try {
            req.log.info('A request was sent.')
            const res = await req.pgPool.query(`SELECT * FROM public.customers;`)
            const customers = res.rows
            reply.code(200).send(customers)
        } catch (error) {
            req.log.error(error)
            reply.reply.code(418).send()
        }
    }
}

const create = {
    method: 'PUT',
    url: '/',
    /**
     * @param {import("fastify").FastifyRequest} req 
     * @param {import('fastify').FastifyReply} reply 
     */
    handler: async function (req, reply) {
        try {
            req.log.info('A request was sent.')
            const customer = req.body
            await req.pgPool.query(`insert INTO public.customers values (default,'${customer.firstName}', '${customer.lastName}', 
                '${customer.email}', '${customer.gender}','${customer.country}','${customer.city}','${customer.street}', '${customer.phone}');`)
            reply.code(200).send()
        } catch (error) {
            req.log.error(error)
            reply.reply.code(418).send()
        }
    }
}

const update = {
    method: 'PUT',
    url: '/:ID',
    /**
     * @param {import("fastify").FastifyRequest} req 
     * @param {import('fastify').FastifyReply} reply 
     */
    handler: async function (req, reply) {
        try {
            req.log.info('A request was sent.')
            const updatedCustomer = req.body
            await req.pgPool.query(`
                UPDATE public.customers
                SET first_name='${updatedCustomer.firstName}', last_name='${updatedCustomer.lastName}', email='${updatedCustomer.email}', gender='${updatedCustomer.gender}',
                country='${updatedCustomer.country}', city='${updatedCustomer.city}', street='${updatedCustomer.street}', phone='${updatedCustomer.phone}'
                WHERE id=${req.params.ID};`)
            reply.code(200).send()
        } catch (error) {
            req.log.error(error)
            reply.reply.code(418).send()
        }
    }
}

const deleteCustomer = {
    method: 'DELETE',
    url: '/:ID',
    /**
     * @param {import("fastify").FastifyRequest} req 
     * @param {import('fastify').FastifyReply} reply 
     */
    handler: async function (req, reply) {
        try {
            req.log.info('A request was sent.')
            await req.pgPool.query(`
                DELETE FROM public.customers
                WHERE id=${req.params.ID};`)
            reply.code(200).send()
        } catch (error) {
            req.log.error(error)
            reply.reply.code(418).send()
        }
    }
}

module.exports = {
    get,
    create,
    update,
    deleteCustomer
}