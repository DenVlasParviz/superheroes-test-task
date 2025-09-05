
const pool = require("./db/index");
const superheroesRoute = require("./routes/api/superheroesRoute");
const path = require('path');

const express = require("express");
const port = process.env.PORT || 3000;
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
//app.use("/api", );


app.use("/api/superheroes",superheroesRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

pool.connect()
    .then(client => {
        console.log("✅ Connected to PostgreSQL database");
        client.release();
    })
    .catch(err => console.error("❌ Database connection error", err.stack));

app.listen(port, console.log(`Server has started on port ${port}`));