/**
 * 
 * @param {import("fastify").FastifyInstance} instance  
 * @param {Function} done 
 */
function closeDBConn(instance, done) {
    instance.pgPool.end()
    done()
}


module.exports = {
    onClose: {
        closeDBConn
    }
}