const Pool = require("pg").Pool;

const pool = new Pool({
    user: "super",
    password: "kodekonan",
    database: "kopishop",
    host: "172.17.0.1",
    port: 5432
});

module.exports = pool;
