const fastify = require('fastify')({
    logger: true
})
const routes = require('./plugins/routes/plugin')

/**
 * 
 * @param {object} param0
 * @param {import("fastify").FastifyInstance} param0.fastify
 */
async function run({ ...deps }) {
    fastify.register(routes, {
        prefix: '/customers',
        'deps': {
            pgPool: deps.pgPool
        }
    })
    console.log(`Listening on the following port: ${deps.port}`)
    await fastify.listen(Number.parseInt(deps.port))
}

module.exports = run