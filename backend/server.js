const express = require("express");
const dotenv = require("dotenv").config();
const { specs, swaggerUi } = require("../documentation/swagger");
const connectDB = require("./config/db");
const cors = require("cors");
const port = 5555;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/user", require("./routes/user.routes"));
app.use("/work", require("./routes/work.routes"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => console.log("serveur lancé sur le port " + port));
