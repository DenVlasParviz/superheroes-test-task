const Pool = require("pg").Pool;
const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "5432",
    database: process.env.DB_NAME || "superheroes_db"
});
pool.connect().then((client) => {
    console.log("connected to database:", client.database)
    client.release();
}).catch((err) => console.error(" Connection error", err.stack));


module.exports = pool;