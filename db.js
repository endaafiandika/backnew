const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "cahbacem2012",
    database: "kopishop",
    host: "localhost",
    port: 5432
});

module.exports = pool;