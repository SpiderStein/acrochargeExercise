const { Pool } = require('pg')
const run = require('./server')

function getServerDependencies() {
    const port = process.env.PORT
    const pgPool = new Pool()

    return {
        port,
        pgPool
    }
}

(async function EntryPoint() {
    await run(getServerDependencies())
})()