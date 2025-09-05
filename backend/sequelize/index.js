
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME     || "superheroes_db",
    process.env.DB_USER     || "postgres",
    process.env.DB_PASSWORD || "root",
    {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT) || 5432,
        dialect: "postgres",
        dialectOptions: {
            ssl: false,
        },
        logging: false,
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log(" Sequelize connected");
    })
    .catch((err) => {
        console.error(" Error connecting sequelize :", err.message);
    });

module.exports = sequelize;
