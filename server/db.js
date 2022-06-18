const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password:"dell123",
    host: "localhost",
    port: 5432,
    database: "qluaitest"
});


module.exports = pool;
