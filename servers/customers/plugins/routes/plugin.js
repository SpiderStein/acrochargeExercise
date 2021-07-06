const { get, create, update, deleteCustomer } = require('./routes')
const { onClose } = require('./hooks')

/**
 * 
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {*} opts 
 * @param {Function} done 
 */
module.exports = function (fastify, opts, done) {
    fastify.decorate('pgPool', opts.deps.pgPool)
    fastify.decorateRequest('pgPool', opts.deps.pgPool)
    fastify.addHook('onClose', onClose.closeDBConn)
    fastify.route(get)
    fastify.route(create)
    fastify.route(update)
    fastify.route(deleteCustomer)

    done()
}