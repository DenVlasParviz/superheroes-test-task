const Pool = require("pg").Pool;
const pool = new Pool({
user:"postgres",
    password:"postgres",
    host:"localhost",
    port:"5432",
    database:"superheroes_db"
});
pool.connect().then((client)=>{
    console.log("connected to database:",client.database)
    client.release();
})  .catch((err) => console.error(" Connection error", err.stack));


module.exports = pool;